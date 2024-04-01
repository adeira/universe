#![forbid(unsafe_code)]
#![forbid(unused_must_use)]
// #![forbid(clippy::missing_panics_doc)]

#[macro_use]
mod global_macros;

use crate::arango::get_database_connection_pool;
use crate::axum_server::create_axum_server;
use crate::clap::generate_clap_app;
use crate::global_configuration::GlobalConfiguration;
use clap_complete::shells::{Bash, Zsh};
use graphql_schema::create_graphql_schema;
use std::net::{Ipv4Addr, SocketAddrV4};
use tracing::level_filters::LevelFilter;
use tracing_subscriber::prelude::*;
use tracing_subscriber::EnvFilter;
use warp::Filter;

mod analytics;
mod arango;
mod archive;
mod auth;
mod axum_server;
mod cats;
mod clap;
mod commerce;
mod global_configuration;
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
mod stripe;
mod warp_server;

#[cfg(test)]
mod tests;

// https://www.lpalmieri.com/posts/2020-09-27-zero-to-production-4-are-we-observable-yet/
fn init_tracing() {
    let fmt_layer = tracing_subscriber::fmt::layer().with_target(false);

    let filter_layer = EnvFilter::from_default_env()
        .add_directive(LevelFilter::WARN.into()) // default when not specified
        .add_directive("server=info".parse().unwrap())
        .add_directive("warp=warn".parse().unwrap());

    tracing_subscriber::registry()
        .with(fmt_layer)
        .with(filter_layer)
        .with(sentry_tracing::layer())
        .init();
}

#[tokio::main]
async fn main() {
    let _guard = sentry::init((
        "https://cd99d8e7c57b47a6adde9a354b9173de@o74963.ingest.sentry.io/4504227234906112",
        sentry::ClientOptions {
            release: sentry::release_name!(),
            ..Default::default()
        },
    ));

    dotenv::dotenv().ok();
    init_tracing();

    // Create database connection pool only once per application lifetime so we can reuse it
    // for the following requests. DO NOT create it in the GraphQL context extractor!
    let cli_matches = generate_clap_app().get_matches();
    if let Some(subcommand_match) = cli_matches.subcommand_matches("generate-cli-completions") {
        if let Some(shell) = subcommand_match.get_one::<String>("shell") {
            let mut clap_app = generate_clap_app();
            let clap_app_name = clap_app.get_name().to_string();
            tracing::info!("Generating completion file for {}...", shell);
            match shell.as_ref() {
                "bash" => clap_complete::generate(
                    Bash,
                    &mut clap_app,
                    clap_app_name,
                    &mut std::io::stdout(),
                ),
                "zsh" => clap_complete::generate(
                    Zsh,
                    &mut clap_app,
                    clap_app_name,
                    &mut std::io::stdout(),
                ),
                _ => panic!("Unknown shell."),
            }
            std::process::exit(0);
        }
    }

    let pool = get_database_connection_pool(
        cli_matches.get_one::<String>("arangodb-url").unwrap(),
        cli_matches.get_one::<String>("arangodb-database").unwrap(),
        cli_matches.get_one::<String>("arangodb-username").unwrap(),
        cli_matches.get_one::<String>("arangodb-password").unwrap(),
    );

    if !cli_matches.get_flag("no-migrations") {
        // Preferably, migrations would NOT be ran during the server start.
        // But we do it now for the simplicity.
        migrations::migrate(&pool).await;
    } else {
        tracing::info!("Skipping database migrations because of --no-migrations")
    }

    let graphql_schema = create_graphql_schema();
    let global_configuration = GlobalConfiguration {
        stripe_restricted_api_key: cli_matches
            .get_one::<String>("stripe-restricted-api-key")
            .map(String::from),
        stripe_webhook_secret: cli_matches
            .get_one::<String>("stripe-webhook-secret")
            .map(String::from),
    };

    let warp_routes =
        warp_server::filters::combined_filter(&pool, graphql_schema, &global_configuration)
            .with(warp::trace(|_info| {
                tracing::info_span!(
                    "request",
                    id = %uuid::Uuid::new_v4(),
                )
            }))
            .with(
                // TODO: respect `Accept-Encoding` header (https://github.com/seanmonstar/warp/pull/513)
                // TODO: this doesn't work with Relay Compiler persisted queries (gzip must be disabled for responses)
                warp::compression::gzip(),
            );

    // TODO: remove once Axum implementation is done and compatible
    let warp_server_addr = SocketAddrV4::new(Ipv4Addr::new(0, 0, 0, 0), 5000);
    println!(
        r#"
        Starting Warp server on {}
         - POST /graphql            (application/json)
         - POST /graphql            (multipart/form-data)
         - GET  /redirect/:uuid
         - GET  /status/ping
         - POST /webhooks/stripe
        "#,
        warp_server_addr
    );

    let listener = tokio::net::TcpListener::bind("0.0.0.0:5050").await.unwrap();
    warp::serve(warp_routes).run(warp_server_addr).await;
    // axum::serve(listener, create_axum_server(pool, global_configuration))
    //     .await
    //     .unwrap()
}
