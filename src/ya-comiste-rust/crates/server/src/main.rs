// This declaration will look for a file named `XXX.rs` or `XXX/mod.rs` and will
// insert its contents inside a module named `XXX` under this scope
mod graphql_schema;

use crate::graphql_schema::create_graphql_schema;
use graphql::graphql_context::Context;
use warp::Filter;

#[tokio::main]
async fn main() {
    std::env::set_var("RUST_LOG", "warp_server");
    env_logger::init();

    let state = warp::any().map(|| Context);
    let graphql_filter = juniper_warp::make_graphql_filter(create_graphql_schema(), state.boxed());
    let graphiql_filter = juniper_warp::graphiql_filter("/graphql", None);

    let cors = warp::cors().allow_methods(vec!["GET", "POST"]);
    let log = warp::log("warp_server");

    let filter = warp::get()
        .and(warp::path::end().and(graphiql_filter))
        .or(warp::post().and(warp::path("graphql").and(graphql_filter)))
        .with(cors)
        .with(log);

    log::info!(target: "warp_server", "Listening on 127.0.0.1:8080");
    warp::serve(filter).run(([127, 0, 0, 1], 8080)).await
}
