use crate::graphql_context::ContextUploadableContentType;
use rusoto_core::Region;
use rusoto_s3::{DeleteObjectRequest, PutObjectRequest, S3Client, S3};

const BUCKED_NAME: &str = "abacus-images-58276402-e657-493a-b0b9-d8c278f3e01d";

pub(in crate::images) struct S3Object {
    pub(crate) s3_filename: String,
}

pub(in crate::images) struct S3Error {
    pub(crate) message: String,
}

/// Tries to upload an image to S3 and returns `S3Object` with the newly created `s3_filename` and
/// original image bytes vector (or error if it fails).
///
/// See: https://docs.aws.amazon.com/AmazonS3/latest/API/API_PutObject.html
pub(in crate::images) async fn upload_image(
    image: &Vec<u8>,
    content_type: &ContextUploadableContentType,
) -> Result<S3Object, S3Error> {
    let s3_client = S3Client::new(Region::UsWest1);
    let s3_filename_extension = match content_type {
        // TODO: DRY with the part of the code which converts it the other way around
        ContextUploadableContentType::ImagePng => "png",
        ContextUploadableContentType::ImageJpeg => "jpeg",
    };
    let s3_filename = format!("{}.{}", uuid::Uuid::new_v4(), s3_filename_extension);
    match s3_client
        .put_object(PutObjectRequest {
            // The uploaded images must be publicly accessible (https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#canned-acl):
            acl: Some(String::from("public-read")),
            bucket: String::from(BUCKED_NAME),
            key: s3_filename.to_string(),
            body: Some(image.clone().into()),
            content_type: Some(match content_type {
                // TODO: DRY with the part of the code which converts it the other way around
                ContextUploadableContentType::ImagePng => "image/png".to_string(),
                ContextUploadableContentType::ImageJpeg => "image/jpeg".to_string(),
            }),
            ..PutObjectRequest::default()
        })
        .await
    {
        Ok(_) => {
            tracing::debug!("Successfully uploaded image '{}' to S3", s3_filename);
            Ok(S3Object {
                s3_filename: s3_filename.to_string(),
            })
        }
        Err(error) => {
            tracing::error!("Unable to upload image '{}' from S3", s3_filename);
            Err(S3Error {
                message: format!("{}", error),
            })
        }
    }
}

/// See: https://docs.aws.amazon.com/AmazonS3/latest/API/API_DeleteObject.html
pub(in crate::images) async fn delete_image(s3_filename: &str) -> Result<S3Object, S3Error> {
    let s3_client = S3Client::new(Region::UsWest1);
    match s3_client
        .delete_object(DeleteObjectRequest {
            bucket: String::from(BUCKED_NAME),
            key: s3_filename.to_string(),
            ..DeleteObjectRequest::default()
        })
        .await
    {
        Ok(_) => {
            tracing::debug!("Successfully deleted image '{}' from S3", s3_filename);
            Ok(S3Object {
                s3_filename: s3_filename.to_owned(),
            })
        }
        Err(error) => {
            tracing::error!("Unable to delete image '{}' from S3", s3_filename);
            Err(S3Error {
                message: format!("{}", error),
            })
        }
    }
}
