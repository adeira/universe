use crate::arango::ConnectionPool;
use crate::auth::get_current_user;
use crate::auth::users::{AnonymousUser, User};
use crate::global_configuration::GlobalConfiguration;
use crate::graphql_context::Context;
use crate::graphql_schema::{create_graphql_schema, Schema};
use crate::stripe::webhook::{verify_stripe_signature, StripeWebhookPayload, StripeWebhookType};
use crate::stripe::CheckoutSession;
use axum::body::Bytes;
use axum::extract::Path;
use axum::http::header::ToStrError;
use axum::http::{HeaderMap, HeaderValue, StatusCode};
use axum::response::{IntoResponse, Redirect};
use axum::Extension;
use juniper_axum::extract::JuniperRequest;
use juniper_axum::response::JuniperResponse;
use std::sync::Arc;

pub(crate) async fn graphql_axum_handler(
    headers: HeaderMap,
    Extension(connection_pool): Extension<ConnectionPool>,
    Extension(global_configuration): Extension<GlobalConfiguration>,
    JuniperRequest(req): JuniperRequest, // should be the last argument as consumes `Request`
) -> impl IntoResponse {
    let authorization_header = headers
        .get("Authorization")
        .map(|value| value.to_str().unwrap_or_default().to_string());

    match get_current_user(&connection_pool, &authorization_header).await {
        Ok(user) => {
            let graphql_schema = create_graphql_schema();

            let context = Context {
                pool: connection_pool,
                uploadables: None, // TODO: currently not implemented on the server
                user,
                global_configuration,
            };

            JuniperResponse(req.execute(&graphql_schema, &context).await).into_response()
        }
        Err(_) => StatusCode::UNAUTHORIZED.into_response(),
    }
}

/// Exposes an Axum handler to redirect URLs. It validates the input UUID and reject it if it's
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

pub(crate) async fn webhooks_axum_handler(
    headers: HeaderMap,
    Extension(connection_pool): Extension<ConnectionPool>,
    Extension(global_configuration): Extension<GlobalConfiguration>,
    body_bytes: Bytes, // must be last as it consumes the request body
) -> impl IntoResponse {
    match headers.get("Stripe-Signature") {
        Some(stripe_signature) => match stripe_signature.to_str() {
            Ok(stripe_signature) => {
                match verify_stripe_signature(
                    &stripe_signature,
                    &body_bytes,
                    &global_configuration.stripe_webhook_secret(),
                ) {
                    Ok(_) => {
                        let stripe_webhook_payload =
                            match serde_json::from_slice::<StripeWebhookPayload>(&body_bytes) {
                                Ok(stripe_webhook_payload) => stripe_webhook_payload,
                                Err(_) => {
                                    let message =
                                        "Unable to get Stripe payload from the request body.";
                                    tracing::error!(message);
                                    return (StatusCode::BAD_REQUEST, message).into_response();
                                }
                            };

                        match crate::stripe::dal::record_webhook_call(
                            &connection_pool,
                            &stripe_webhook_payload,
                        )
                        .await
                        {
                            Ok(_) => {}
                            Err(error) => {
                                tracing::error!(
                                    "Unable to record Stripe payload in our database: {}",
                                    error
                                );
                                return (
                                    StatusCode::INTERNAL_SERVER_ERROR,
                                    "Unable to record Stripe payload in our database.",
                                )
                                    .into_response();
                            }
                        }

                        let webhook_type = &stripe_webhook_payload.r#type;
                        match webhook_type {
                            StripeWebhookType::CheckoutSessionCompleted => {
                                match crate::stripe::webhook_handlers::checkout_session::completed(
                                    &connection_pool,
                                    &serde_json::from_value::<CheckoutSession>(
                                        stripe_webhook_payload.data.object,
                                    )
                                    .unwrap(), // TODO: fix unwrap
                                )
                                .await
                                {
                                    Ok(_) => {
                                        tracing::info!("Stripe webhook with type '{:?}' was executed successfully.", webhook_type);
                                        return StatusCode::OK.into_response();
                                    }
                                    Err(_) => {
                                        let message = format!(
                                            "Stripe webhook with type '{:?}' failed to execute.",
                                            webhook_type
                                        );
                                        tracing::error!("{}", message);
                                        return (StatusCode::INTERNAL_SERVER_ERROR, message)
                                            .into_response();
                                    }
                                }
                            }
                            _ => {
                                tracing::warn!(
                                    "Stripe webhook with type '{:?}' was called but there is no handler for it (ignoring).",
                                    webhook_type
                                );
                                return StatusCode::OK.into_response();
                            }
                        };
                    }
                    Err(_) => {
                        let message = "Invalid signature.";
                        tracing::error!(message);
                        return (StatusCode::UNAUTHORIZED, message).into_response();
                    }
                }
            }
            Err(_) => {
                let message =
                    "Unable to verify Stripe signature (cannot parse Stripe-Signature header).";
                tracing::error!(message);
                return (StatusCode::BAD_REQUEST, message).into_response();
            }
        },
        None => {
            let message = "Unable to verify Stripe signature (Stripe-Signature header is missing).";
            tracing::error!(message);
            return (StatusCode::BAD_REQUEST, message).into_response();
        }
    }
}
