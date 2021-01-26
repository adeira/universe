use crate::arangodb::ConnectionPool;
use crate::auth::users::User;
use crate::graphql_context::Context;
use crate::graphql_schema::Schema;
use crate::sdui::model::component_content::get_content_dataloader;
use crate::warp_graphql::models::get_current_user;
use bytes::BufMut;
use futures::{TryFutureExt, TryStreamExt};
use juniper::http::GraphQLRequest;
use std::collections::HashMap;
use std::convert::Infallible;
use std::sync::Arc;
use warp::http::StatusCode;
use warp::multipart;

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
    session_token: Option<String>,
) -> Result<Box<dyn warp::Reply>, Infallible> {
    match get_current_user(&pool, &session_token).await {
        Ok(user) => {
            let context = Context {
                pool: pool.clone(),
                content_dataloader: get_content_dataloader(&user, &pool),
                user,
                uploadables: None,
            };
            let response = request.execute(&schema, &context).await;
            Ok(Box::new(warp::reply::json(&response))) // TODO: take `response.is_ok()` into account
        }
        Err(_) => reject_with_permissions_error(None),
    }
}

pub(in crate::warp_graphql) async fn graphql_multipart(
    form_data: multipart::FormData,
    pool: ConnectionPool,
    schema: Arc<Schema>,
    session_token: Option<String>,
) -> Result<Box<dyn warp::Reply>, Infallible> {
    match get_current_user(&pool, &session_token).await {
        Ok(user) => {
            // TODO: implement (https://blog.logrocket.com/file-upload-and-download-in-rust/)
            //  - process the query (via `graphql_post`)
            //  - process the files (limit `content_type` and file size)
            //  - upload to S3 and save into DB with computed blurhash
            //
            // TODO: allow only certain file extensions

            let mut parts: HashMap<String, Vec<u8>> = form_data
                .and_then(|part| {
                    let name = part.name().to_string();
                    let value = part.stream().try_fold(Vec::new(), |mut vec, data| {
                        vec.put(data);
                        async move { Ok(vec) }
                    });
                    value.map_ok(move |vec| (name, vec))
                })
                .try_collect()
                .await
                .map_err(|e| {
                    panic!("multipart error: {:?}", e);
                })
                .unwrap(); // warp::Rejection instead? 🤔

            if let None = parts.get("query") {
                return reject_with_error_message(
                    "Query is a required field when using multipart GraphQL.",
                );
            }

            let request = GraphQLRequest::new(
                std::str::from_utf8(&parts.get("query").expect("query must be specified")) // TODO: warp::Rejection
                    .unwrap()
                    .to_string(),
                None, // TODO
                None, // TODO
            );

            // Remove GraphQL specifics to be left only with uploadables.
            parts.remove("query");
            parts.remove("operation_name");
            parts.remove("variables");

            let context = Context {
                pool: pool.clone(),
                content_dataloader: get_content_dataloader(&user, &pool),
                user: user.clone(),
                uploadables: Some(parts.clone()),
            };

            if parts.keys().len() > 0 {
                return match user {
                    User::AdminUser(_) => {
                        // only ADMIN is allowed to upload files
                        let response = request.execute(&schema, &context).await;
                        Ok(Box::new(warp::reply::json(&response))) // TODO: take `response.is_ok()` into account
                    }
                    _ => reject_with_permissions_error(Some("admin required when uploading")),
                };
            } else {
                let response = request.execute(&schema, &context).await;
                Ok(Box::new(warp::reply::json(&response))) // TODO: take `response.is_ok()` into account
            }
        }
        Err(_) => reject_with_permissions_error(None),
    }
}

fn reject_with_permissions_error(
    message: Option<&str>,
) -> Result<Box<dyn warp::Reply>, Infallible> {
    let code = StatusCode::FORBIDDEN;
    let json = warp::reply::json(&ErrorMessage {
        code: code.as_u16(),
        message: match message {
            Some(message) => Some(message.to_string()),
            None => None,
        },
    });
    Ok(Box::new(warp::reply::with_status(json, code)))
}

fn reject_with_error_message(message: &str) -> Result<Box<dyn warp::Reply>, Infallible> {
    let code = StatusCode::BAD_REQUEST;
    let json = warp::reply::json(&ErrorMessage {
        code: code.as_u16(),
        message: Some(message.to_string()),
    });
    Ok(Box::new(warp::reply::with_status(json, code)))
}
