use axum::response::IntoResponse;
use axum::{routing::get, Extension, Json, Router};
use juniper::{EmptyMutation, EmptySubscription, FieldResult, RootNode};
use std::sync::Arc;

struct QueryRoot;

#[juniper::graphql_object]
impl QueryRoot {
    fn hello() -> FieldResult<String> {
        Ok("Hello, world!".into())
    }
}

type Schema = RootNode<'static, QueryRoot, EmptyMutation<()>, EmptySubscription<()>>;

pub fn create_axum_server() -> Router<()> {
    let graphql_schema = Arc::new(Schema::new(
        QueryRoot,
        EmptyMutation::new(),
        EmptySubscription::new(),
    ));

    Router::new()
        .route(
            "/graphql",
            get(graphql_playground), // .post(graphql_handler)
        )
        .layer(Extension(Arc::new(graphql_schema)))
}

async fn graphql_playground() -> impl IntoResponse {
    juniper::http::playground::playground_source("/graphql", None)
}

// async fn graphql_handler(
//     Extension(schema): Extension<Arc<Schema>>,
//     Json(data): Json<juniper::http::GraphQLRequest>,
// ) -> Json<juniper::http::GraphQLResponse> {
//     Json(data.execute_sync(&schema, &()))
// }
