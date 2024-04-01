use crate::arango::ConnectionPool;
use crate::auth::users::{AnonymousUser, User};
use crate::global_configuration::GlobalConfiguration;
use crate::graphql_context::Context;
use crate::graphql_schema::{create_graphql_schema, Schema};
use axum::{
    routing::{get, post},
    Extension, Router,
};
use juniper_axum::{extract::JuniperRequest, response::JuniperResponse};
use std::sync::Arc;

pub fn create_axum_server(
    pool: ConnectionPool,
    global_configuration: GlobalConfiguration,
) -> Router<()> {
    let graphql_schema = create_graphql_schema();

    let context = Context {
        pool,
        uploadables: None,
        user: User::AnonymousUser(AnonymousUser::new()), // TODO
        global_configuration,
    };

    Router::new()
        // POST /graphql (application/json)
        // POST /graphql (multipart/form-data) → TODO
        .route(
            "/graphql",
            post(graphql_handler),
        )
        // GET /status/ping
        .route("/status/ping", get(|| async { "pong" }))
        .layer(Extension(Arc::new(graphql_schema)))
        .layer(Extension(context))
}

async fn graphql_handler(
    Extension(schema): Extension<Arc<Schema>>,
    Extension(context): Extension<Context>,
    JuniperRequest(req): JuniperRequest, // should be the last argument as consumes `Request`
) -> JuniperResponse {
    JuniperResponse(req.execute(&*schema, &context).await)
}
