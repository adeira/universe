use crate::arango::ConnectionPool;
use crate::graphql_context::Context;
use crate::graphql_schema::Schema;
use axum::extract::Path;
use axum::http::StatusCode;
use axum::response::{IntoResponse, Redirect};
use axum::Extension;
use juniper_axum::extract::JuniperRequest;
use juniper_axum::response::JuniperResponse;
use std::sync::Arc;

pub(crate) async fn graphql_axum_handler(
    Extension(schema): Extension<Arc<Schema>>,
    Extension(context): Extension<Context>,
    JuniperRequest(req): JuniperRequest, // should be the last argument as consumes `Request`
) -> JuniperResponse {
    JuniperResponse(req.execute(&*schema, &context).await)
}

/// Exposes a Warp filter to handle redirect URLs. It validates the input UUID and reject it if it's
/// not a valid UUID format (with 404).
///
/// URL example:
/// - http://localhost:5000/redirect/ef5f060a-ff77-4a76-9581-fa0031cb305d
pub(crate) async fn redirect_axum_handler(
    Path(unsafe_uuid): Path<String>,
    Extension(connection_pool): Extension<ConnectionPool>,
) -> impl IntoResponse {
    // First, we validate the UUID to make sure it's really a valid UUID:
    match uuid::Uuid::parse_str(&unsafe_uuid) {
        Ok(uuid) => {
            match crate::analytics::get_link_and_record_hit(&connection_pool, &uuid).await {
                Some(redirect_url) => {
                    // The redirect must always stay temporary so that browsers won't cache
                    // the redirect, and we always hit Abacus (and record analytics hit).
                    Redirect::temporary(&redirect_url).into_response()
                }
                None => StatusCode::NOT_FOUND.into_response(),
            }
        }
        Err(_) => StatusCode::NOT_FOUND.into_response(),
    }
}
