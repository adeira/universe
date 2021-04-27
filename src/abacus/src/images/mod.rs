/// This module is responsible for processing images:
///
/// 1) generate blurhashes and save all the info into database
/// 2) strip EXIF images metadata (TODO)
/// 3) upload images to S3 (TODO, via `rusoto_s3`)
///
use crate::auth::users::User;
use crate::commerce::api::ProductMultilingualInput;
use crate::graphql_context::{Context, ContextUploadable, ContextUploadableContentType};
use blurhash_wasm::{encode, EncodingError};
use image::DynamicImage;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

mod s3;

#[derive(Debug)]
pub(crate) enum ModelError {
    PermissionsError(String),
    ProcessingError(String),
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
        resolve_cloudfront_url(self.name_s3.as_ref())
    }
}

/// Accepts uploadables from the user and tries to create a Blurhashes and save them to S3. It
/// returns the processed images back to be saved in a database.
///
/// Only admin is allowed to process the images and only images specified in the multilingual input
/// can be processed.
pub(crate) async fn process_images(
    context: &Context,
    product_multilingual_input: &ProductMultilingualInput,
) -> Result<Vec<Image>, ModelError> {
    if let Some(uploadables) = &context.uploadables {
        // First, we make sure that images specified in the GraphQL input are actually being uploaded:
        for image_name in &product_multilingual_input.images {
            match uploadables.get(&image_name.to_string()) {
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

        // Second, we check it the other way around - whether all uploadables are specified in the input:
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

    match &context.user {
        // only admin can process images (must be authorized)
        User::AdminUser(_) => {
            if let Some(uploadables) = &context.uploadables {
                let images = process_images_authorized(&uploadables).await?;
                return Ok(images);
            } else {
                return Err(ModelError::ProcessingError(String::from(
                    "there are no images to process",
                )));
            }
        }
        _ => Err(ModelError::PermissionsError(String::from(
            "only admin can process images",
        ))),
    }
}

async fn process_images_authorized(
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
                    Ok(image_result) => {
                        processed_images.push(Image {
                            name_s3: s3_image.s3_filename,
                            name_original: filename.to_string(),
                            blurhash: calculate_image_blurhash(image_result).unwrap(), // TODO: do not unwrap
                        });
                    }
                    Err(_) => {
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

/// This function calculates blurhash of the image (https://blurha.sh/).
fn calculate_image_blurhash(image: DynamicImage) -> Result<String, EncodingError> {
    let input = image.to_rgba8();
    let (width, height) = input.dimensions();
    encode(input.into_vec(), 4, 4, width as usize, height as usize)
}

// TODO: use in GraphQL output
fn resolve_cloudfront_url(path: &str) -> String {
    let cloudfront_domain = "https://d3nujwlesxo9e6.cloudfront.net/";
    format!(
        "{}/{}",
        cloudfront_domain.trim_end_matches('/'),
        path.trim_start_matches('/')
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn blurhash_test() {
        let image = image::open("src/images/tests/data/img.png").unwrap();
        assert_eq!(
            calculate_image_blurhash(image).unwrap(),
            "UIFFXSUH]:+p@-5c+*JO@[s~[Q6.}.F_jDOZ"
        );
    }

    #[test]
    fn resolve_cloudfrom_url_happy_path() {
        insta::assert_snapshot!(resolve_cloudfront_url("test.png"))
    }

    #[test]
    fn resolve_cloudfrom_url_leading_slash() {
        insta::assert_snapshot!(resolve_cloudfront_url("/test.png"))
    }
}
