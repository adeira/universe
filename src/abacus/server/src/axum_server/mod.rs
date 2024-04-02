mod handlers;

#[cfg(test)]
mod tests;

use crate::arango::ConnectionPool;
use crate::axum_server::handlers::{
    graphql_axum_handler, redirect_axum_handler, webhooks_axum_handler,
};
use crate::global_configuration::GlobalConfiguration;
use axum::{
    routing::{get, post},
    Extension, Router,
};
use tower_http::cors::CorsLayer;
use tower_http::trace::TraceLayer;

pub fn create_axum_server(
    connection_pool: ConnectionPool,
    global_configuration: GlobalConfiguration,
) -> Router<()> {
    Router::new()
        // Alphabetically sorted routes:
        .route("/graphql", get(graphql_axum_handler).post(graphql_axum_handler))
        .route("/redirect/:uuid", get(redirect_axum_handler))
        .route("/status/ping", get(|| async { "pong" })) // TODO: perform some check to make sure the server is healthy (DB check)
        .route("/webhooks/stripe", post(webhooks_axum_handler))
        // Common layers:
        .layer(TraceLayer::new_for_http())
        .layer(CorsLayer::permissive())
        // TODO: implement other layers such as `RequestIdLayer` and `TimeoutLayer` (https://docs.rs/axum/latest/axum/middleware/index.html#commonly-used-middleware)
        .layer(Extension(connection_pool))
        .layer(Extension(global_configuration))
}
