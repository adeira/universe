/// This module is responsible for processing images:
///
/// Uploading:
///  1) generate blurhashes and save all the info into database
///  2) strip EXIF images metadata (TODO)
///  3) upload images to S3
///
use crate::auth::rbac;
use crate::auth::rbac::Actions::Files;
use crate::auth::rbac::FilesActions::{DeleteFile, UploadFile};
use crate::auth::rbac::RbacError;
use crate::commerce::api::ProductMultilingualInput;
use crate::graphql_context::{Context, ContextUploadable, ContextUploadableContentType};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

mod blurhash;
mod cloudfront;
mod s3;

#[derive(thiserror::Error, Debug)]
pub(crate) enum ModelError {
    #[error("Processing error: {0}")]
    ProcessingError(String),
    #[error("RBAC error: {0}")]
    RbacError(#[from] RbacError),
}

// so we can use the `?` operator with ArangoDB client error
impl From<arangors::ClientError> for ModelError {
    fn from(err: arangors::ClientError) -> ModelError {
        ModelError::ProcessingError(format!("{}", err))
    }
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub(crate) struct Image {
    /// UUID of the image stored in S3.
    name_s3: String,
    /// Original image name to be displayed on FE (not important for backend).
    name_original: String,
    /// See: https://blurha.sh/
    blurhash: String,
}

#[juniper::graphql_object]
impl Image {
    fn name(&self) -> String {
        self.name_original.to_owned()
    }

    fn blurhash(&self) -> String {
        self.blurhash.to_owned()
    }

    fn url(&self) -> String {
        cloudfront::resolve_cloudfront_url(self.name_s3.as_ref())
    }
}

impl Image {
    pub(crate) fn name(&self) -> String {
        self.name_original.to_owned()
    }

    fn s3name(&self) -> String {
        self.name_s3.to_owned()
    }
}

/// Checks whether GraphQL images input corresponds with the uploadables (GraphQL input must match
/// `multipart/form-data` payload). This validation should be called when creating a product for
/// example. Editation of the product can (should) skip this validation.
fn validate_images_input(
    context: &Context,
    product_multilingual_input: &ProductMultilingualInput,
) -> Result<(), ModelError> {
    if let Some(uploadables) = &context.uploadables {
        for image_name in &product_multilingual_input.images {
            match &uploadables.get(&image_name.to_string()) {
            Some(_) => {} // OK, good
            None => {
                return Err(ModelError::ProcessingError(
                    format!(
                        "trying to upload '{}' but this image name doesn't exist in the multipart request body",
                        image_name
                    ),
                ))
            }
        }
        }
    }
    Ok(())
}

/// Checks whether `multipart/form-data` payload (uploadables) matches the GraphQL input. This
/// validation should be called ALWAYS: every uploadable should have corresponding input.
fn validate_uploadables(
    context: &Context,
    product_multilingual_input: &ProductMultilingualInput,
) -> Result<(), ModelError> {
    if let Some(uploadables) = &context.uploadables {
        for image_name in uploadables.keys() {
            match product_multilingual_input
                .images
                .iter()
                .find(|image| image.to_string() == *image_name)
            {
                Some(_) => {} // OK, good
                None => {
                    return Err(ModelError::ProcessingError(format!(
                    "trying to upload '{}' but this image name doesn't exist in the GraphQL input",
                    image_name
                )))
                }
            }
        }
    }
    Ok(())
}

/// Accepts uploadables from the user and tries to create a Blurhashes and save them to S3. It
/// returns the processed images back to be saved in a database.
///
/// Only admin is allowed to process the images and only images specified in the multilingual input
/// can be processed.
pub(crate) async fn process_new_images(
    context: &Context,
    product_multilingual_input: &ProductMultilingualInput,
) -> Result<Vec<Image>, ModelError> {
    // First, we make sure that images specified in the GraphQL input are actually being uploaded:
    validate_images_input(&context, &product_multilingual_input)?;

    // Second, we check it the other way around - whether all uploadables are specified in the input:
    validate_uploadables(&context, &product_multilingual_input)?;

    match rbac::verify_permissions(&context.user, &Files(UploadFile)).await {
        Ok(_) => {
            return if let Some(uploadables) = &context.uploadables {
                let images = process_new_images_authorized(&uploadables).await?;
                Ok(images)
            } else {
                Err(ModelError::ProcessingError(String::from(
                    "there are no images to process",
                )))
            }
        }
        Err(e) => Err(ModelError::from(e)),
    }
}

/// This is technically similar to `process_new_images` except it takes image updates into account.
/// The main difference is that it doesn't validate whether all inputs are actually send in the POST
/// body. It's because when we are updating the product, we require to send the image names otherwise
/// they get deleted.
///
/// Only admin is allowed to process the images and only images specified in the multilingual input
/// can be processed.
pub(crate) async fn process_updated_images(
    context: &Context,
    product_multilingual_input: &ProductMultilingualInput,
) -> Result<Vec<Image>, ModelError> {
    validate_uploadables(&context, &product_multilingual_input)?;

    match rbac::verify_permissions(&context.user, &Files(UploadFile)).await {
        Ok(_) => {
            return if let Some(uploadables) = &context.uploadables {
                let images = process_new_images_authorized(&uploadables).await?;
                Ok(images)
            } else {
                Err(ModelError::ProcessingError(String::from(
                    "there are no images to process",
                )))
            };
        }
        Err(e) => Err(ModelError::from(e)),
    }
}

async fn process_new_images_authorized(
    uploadables: &HashMap<String, ContextUploadable>,
) -> Result<Vec<Image>, ModelError> {
    let mut processed_images = vec![];
    for (filename, uploadable) in uploadables.iter() {
        // First, we try to upload the image to S3:
        match s3::upload_image(&uploadable.data(), &uploadable.content_type()).await {
            Ok(s3_image) => {
                // IF everything OK, we try to calculate Blurhash and return it:
                let image_result = image::load_from_memory_with_format(
                    &uploadable.data(),
                    match &uploadable.content_type() {
                        ContextUploadableContentType::ImagePng => image::ImageFormat::Png,
                        ContextUploadableContentType::ImageJpeg => image::ImageFormat::Jpeg,
                    },
                );

                match image_result {
                    Ok(image) => {
                        processed_images.push(Image {
                            name_s3: s3_image.s3_filename,
                            name_original: filename.to_string(),
                            // TODO: do not unwrap the blurhash:
                            blurhash: blurhash::calculate_image_blurhash(image).unwrap(),
                        });
                    }
                    Err(error) => {
                        tracing::error!("cannot load image from memory: {}", error);
                        return Err(ModelError::ProcessingError(String::from(
                            "cannot load image from memory",
                        )));
                    }
                }
            }
            Err(s3_error) => return Err(ModelError::ProcessingError(s3_error.message)),
        }
    }
    Ok(processed_images)
}

/// Only admin can delete images.
pub(crate) async fn delete_image(context: &Context, image: &Image) -> Result<Image, ModelError> {
    match rbac::verify_permissions(&context.user, &Files(DeleteFile)).await {
        Ok(_) => match s3::delete_image(&image.s3name()).await {
            Ok(_) => Ok(image.clone()),
            Err(s3_error) => return Err(ModelError::ProcessingError(s3_error.message)),
        },
        Err(e) => Err(ModelError::from(e)),
    }
}
