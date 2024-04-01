mod handlers;

use crate::arango::ConnectionPool;
use crate::auth::users::{AnonymousUser, User};
use crate::axum_server::handlers::{graphql_axum_handler, redirect_axum_handler};
use crate::global_configuration::GlobalConfiguration;
use crate::graphql_context::Context;
use crate::graphql_schema::create_graphql_schema;
use axum::{
    routing::{get, post},
    Extension, Router,
};
use std::sync::Arc;

pub fn create_axum_server(
    connection_pool: ConnectionPool,
    global_configuration: GlobalConfiguration,
) -> Router<()> {
    let graphql_schema = create_graphql_schema();

    let context = Context {
        pool: connection_pool.clone(),
        uploadables: None,
        user: User::AnonymousUser(AnonymousUser::new()), // TODO
        global_configuration,
    };

    Router::new()
        // POST /graphql (application/json)
        // POST /graphql (multipart/form-data) → TODO
        .route(
            "/graphql",
            post(graphql_axum_handler),
        )
        // GET /redirect/:uuid
        .route("/redirect/:uuid", get(redirect_axum_handler))
        // GET /status/ping
        .route("/status/ping", get(|| async { "pong" }))
        .layer(Extension(Arc::new(graphql_schema)))
        .layer(Extension(context))
        .layer(Extension(connection_pool))
}
