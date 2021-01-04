use crate::arangodb::get_database_connection_pool;
use graphql_schema::create_graphql_schema;
use std::net::{Ipv4Addr, SocketAddrV4};
use warp::Filter;

mod arangodb;
mod auth;
mod commerce;
mod graphql_context;
mod graphql_schema;
mod headers;
mod images;
mod migrations;
mod pos;
mod sdui;
mod warp_graphql;

#[tokio::main]
async fn main() {
    std::env::set_var(
        "RUST_LOG",
        "warp_server,arangodb=trace,auth=trace,sdui=trace,server=trace",
    );
    env_logger::builder().format_timestamp(None).init();

    // Create database connection pool only once per application lifetime so we can reuse it
    // for the following requests. DO NOT create it in the GraphQL context extractor!
    let pool = get_database_connection_pool();

    // Preferably, migrations would NOT be ran during the server start.
    // But we do it now for the simplicity.
    migrations::migrate(&pool).await;

    let schema = create_graphql_schema();

    let cors = warp::cors()
        .allow_any_origin() // TODO
        .allow_headers(vec!["x-client", "content-type"])
        .allow_methods(vec![warp::http::Method::POST]);

    // This opens a possibility for other REST endpoints (webhooks for example).
    let api = warp_graphql::filters::graphql(pool, schema);
    let routes = api.with(warp::log("warp_server")).with(cors);

    let socket = SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 8080);
    log::info!(target: "warp_server", "Listening on {}", socket);
    // TODO: how to display these routes automatically (?)
    log::info!(target: "warp_server", " - POST /graphql   (application/json)");
    log::info!(target: "warp_server", " - POST /graphql   (multipart/form-data)");
    warp::serve(routes).run(socket).await
}

#[cfg(test)]
mod tests;
