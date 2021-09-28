#![deny(unused_must_use)]
#![forbid(unsafe_code)]

#[macro_use]
mod global_macros;

use crate::arango::get_database_connection_pool;
use crate::clap::generate_clap_app;
use graphql_schema::create_graphql_schema;
use std::net::{Ipv4Addr, SocketAddrV4};
use tracing::level_filters::LevelFilter;
use tracing_subscriber::EnvFilter;
use warp::Filter;

mod analytics;
mod arango;
mod archive;
mod auth;
mod clap;
mod commerce;
mod graphql;
mod graphql_context;
mod graphql_schema;
mod headers;
mod images;
mod locale;
mod menu;
mod migrations;
mod pos;
mod price;
mod tracking;
mod warp_graphql;

#[cfg(test)]
mod tests;

// https://www.lpalmieri.com/posts/2020-09-27-zero-to-production-4-are-we-observable-yet/
fn init_tracing() {
    let filter = EnvFilter::from_default_env()
        .add_directive(LevelFilter::WARN.into()) // default when not specified
        .add_directive("server=info".parse().unwrap())
        .add_directive("warp=warn".parse().unwrap());

    // TODO: parallel JSON logging for system processing (YOLO, store into ArangoDB?)
    tracing_subscriber::fmt()
        .with_env_filter(filter)
        .with_target(true)
        .init();
}

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();
    init_tracing();

    // TODO: how to display these routes automatically (?)
    let server_addr = SocketAddrV4::new(Ipv4Addr::new(0, 0, 0, 0), 5000);
    println!(
        r#"
        Starting server on {}
         - POST /graphql            (application/json)
         - POST /graphql            (multipart/form-data)
         - GET  /redirect/:uuid
         - GET  /status/ping
        "#,
        server_addr
    );

    // Create database connection pool only once per application lifetime so we can reuse it
    // for the following requests. DO NOT create it in the GraphQL context extractor!
    let cli_matches = generate_clap_app().get_matches();
    let pool = get_database_connection_pool(
        cli_matches.value_of("arangodb-url").unwrap(),
        cli_matches.value_of("arangodb-database").unwrap(),
        cli_matches.value_of("arangodb-username").unwrap(),
        cli_matches.value_of("arangodb-password").unwrap(),
    );

    let graphql_schema = create_graphql_schema();
    let graphql_warp_filter = warp_graphql::filters::graphql(&pool, graphql_schema);
    let redirects_warp_filter = warp_graphql::filters::redirects(&pool);
    let status_ping_pong_filter = warp_graphql::filters::ping_pong();

    let routes = graphql_warp_filter
        .or(redirects_warp_filter)
        .or(status_ping_pong_filter)
        .with(warp::trace(|_info| {
            tracing::info_span!(
                "request",
                id = %uuid::Uuid::new_v4(),
            )
        }))
        .with(
            // TODO: respect `Accept-Encoding` header (https://github.com/seanmonstar/warp/pull/513)
            warp::compression::gzip(),
        );

    if !cli_matches.is_present("no-migrations") {
        // Preferably, migrations would NOT be ran during the server start.
        // But we do it now for the simplicity.
        migrations::migrate(&pool).await;
    } else {
        tracing::info!("Skipping database migrations because of --no-migrations")
    }

    // TODO: `Server-Timing` header (https://w3c.github.io/server-timing/)
    warp::serve(routes).run(server_addr).await
}
