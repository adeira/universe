use crate::arango::ConnectionPool;
use crate::auth::rbac;
use crate::auth::rbac::Actions::Files;
use crate::auth::rbac::FilesActions::UploadFile;
use crate::graphql_context::{Context, ContextUploadable, ContextUploadableContentType};
use crate::graphql_schema::Schema;
use crate::warp_graphql::models::get_current_user;
use bytes::BufMut;
use futures::TryStreamExt;
use juniper::http::GraphQLRequest;
use std::collections::HashMap;
use std::sync::Arc;
use warp::filters::multipart::Part;
use warp::http::StatusCode;
use warp::{multipart, Rejection, Reply};

/// An API error serializable to JSON.
#[derive(serde::Serialize)]
struct ErrorMessage {
    code: u16,
    message: Option<String>,
}

pub(in crate::warp_graphql) async fn graphql_post(
    request: GraphQLRequest,
    pool: ConnectionPool,
    schema: Arc<Schema>,
    authorization_header: Option<String>,
) -> Result<Box<dyn Reply>, Rejection> {
    match get_current_user(&pool, &authorization_header).await {
        Ok(user) => {
            let context = Context {
                pool: pool.clone(),
                uploadables: None,
                user,
            };
            let response = request.execute(&schema, &context).await;
            Ok(Box::new(warp::reply::json(&response))) // TODO: take `response.is_ok()` into account
        }
        Err(e) => reject_with_permissions_error(Some(&e)),
    }
}

pub(in crate::warp_graphql) async fn graphql_multipart(
    form_data: multipart::FormData,
    pool: ConnectionPool,
    schema: Arc<Schema>,
    authorization_header: Option<String>,
) -> Result<Box<dyn Reply>, Rejection> {
    let parts: Vec<Part> = form_data.try_collect().await.map_err(|e| {
        tracing::error!("multipart error: {}", e);
        warp::reject::reject()
    })?;

    let mut graphql_chunks: HashMap<String, String> = HashMap::new();
    let mut uploadable_chunks: HashMap<String, ContextUploadable> = HashMap::new();

    for part in parts {
        match part.name() {
            "query" | "operation_name" | "variables" => {
                // special GraphQL fields
                let part_name = part.name().to_string();
                let part_value = try_fold_multipart_stream(part).await?;
                graphql_chunks.insert(
                    part_name,
                    std::str::from_utf8(&*part_value).unwrap().to_string(),
                );
            }
            _ => {
                // uploadables
                let filename = part.filename().unwrap_or_else(|| part.name()).to_string();
                match part.content_type() {
                    Some(file_type) => match file_type {
                        // allowed file types
                        "image/jpeg" => {
                            uploadable_chunks.insert(
                                filename,
                                ContextUploadable::new(
                                    try_fold_multipart_stream(part).await?,
                                    ContextUploadableContentType::ImageJpeg,
                                ),
                            );
                        }
                        "image/png" => {
                            uploadable_chunks.insert(
                                filename,
                                ContextUploadable::new(
                                    try_fold_multipart_stream(part).await?,
                                    ContextUploadableContentType::ImagePng,
                                ),
                            );
                        }
                        invalid_file_type => {
                            return reject_with_error_message(
                                format!("invalid uploadable file type: {}", invalid_file_type)
                                    .as_ref(),
                            );
                        }
                    },
                    None => {
                        return reject_with_error_message("unknown uploadable file type");
                    }
                }
            }
        }
    }

    if graphql_chunks.get("query").is_none() {
        return reject_with_error_message(
            "Query is a required field when using multipart GraphQL.",
        );
    }

    let graphql_request = GraphQLRequest::new(
        graphql_chunks
            .get("query")
            .expect("query must be specified")
            .to_string(),
        graphql_chunks.get("operation_name").map(String::from),
        graphql_chunks
            .get("variables")
            .map(|v| serde_json::from_str(&v).unwrap()),
    );

    match get_current_user(&pool, &authorization_header).await {
        Ok(user) => {
            let context = Context {
                pool: pool.clone(),
                uploadables: Some(uploadable_chunks.clone()),
                user: user.clone(),
            };

            if uploadable_chunks.keys().len() > 0 {
                match rbac::verify_permissions(&user, &Files(UploadFile)).await {
                    Ok(_) => {
                        let response = graphql_request.execute(&schema, &context).await;
                        Ok(Box::new(warp::reply::json(&response))) // TODO: take `response.is_ok()` into account
                    }
                    Err(_) => reject_with_permissions_error(Some(
                        "admin permissions required when uploading",
                    )),
                }
            } else {
                let response = graphql_request.execute(&schema, &context).await;
                Ok(Box::new(warp::reply::json(&response))) // TODO: take `response.is_ok()` into account
            }
        }
        Err(e) => reject_with_permissions_error(Some(&e)),
    }
}

async fn try_fold_multipart_stream(part: Part) -> Result<Vec<u8>, Rejection> {
    part.stream()
        .try_fold(Vec::new(), |mut vec, data| {
            vec.put(data);
            async move { Ok(vec) }
        })
        .await
        .map_err(|e| {
            tracing::error!("error reading multipart stream: {}", e);
            warp::reject::reject()
        })
}

#[allow(clippy::unnecessary_wraps)]
fn reject_with_permissions_error(message: Option<&str>) -> Result<Box<dyn Reply>, Rejection> {
    let code = StatusCode::FORBIDDEN;
    let json = warp::reply::json(&ErrorMessage {
        code: code.as_u16(),
        message: match message {
            Some(message) => {
                tracing::error!("{}", message.to_string());
                Some(message.to_string())
            }
            None => None,
        },
    });
    Ok(Box::new(warp::reply::with_status(json, code)))
}

#[allow(clippy::unnecessary_wraps)]
fn reject_with_error_message(message: &str) -> Result<Box<dyn Reply>, Rejection> {
    tracing::error!("{}", message.to_string());
    let code = StatusCode::BAD_REQUEST;
    let json = warp::reply::json(&ErrorMessage {
        code: code.as_u16(),
        message: Some(message.to_string()),
    });
    Ok(Box::new(warp::reply::with_status(json, code)))
}
