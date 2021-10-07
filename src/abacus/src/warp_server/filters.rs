use crate::arango::ConnectionPool;
use crate::global_configuration::GlobalConfiguration;
use crate::graphql_schema::Schema;
use crate::warp_server;
use juniper::http::GraphQLRequest;
use std::convert::Infallible;
use std::sync::Arc;
use warp::{Filter, Rejection, Reply};

/// This is the only public filter available to the server. It combines all other filters together.
pub(crate) fn combined_filter(
    pool: &ConnectionPool,
    graphql_schema: Schema,
    global_configuration: &GlobalConfiguration,
) -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    let graphql_warp_filter =
        warp_server::filters::graphql(pool, graphql_schema, global_configuration);
    let redirects_warp_filter = warp_server::filters::redirects(pool);
    let status_ping_pong_filter = warp_server::filters::ping_pong();
    let webhooks_warp_filter = warp_server::filters::webhooks(pool, global_configuration);

    graphql_warp_filter
        .or(redirects_warp_filter)
        .or(status_ping_pong_filter)
        .or(webhooks_warp_filter)
}

fn ping_pong() -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    warp::path!("status" / "ping")
        .and(warp::get())
        .and(warp::path::end())
        .map(|| "pong".to_string()) // TODO: perform some check to make sure the server is healthy (DB check)
}

fn redirects(
    pool: &ConnectionPool,
) -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    warp::path!("redirect" / String)
        .and(warp::get())
        .and(warp::path::end())
        .and(with_database_connection_pool(pool))
        .and_then(warp_server::handlers::redirects)
}

fn webhooks(
    pool: &ConnectionPool,
    global_configuration: &GlobalConfiguration,
) -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    // We have only one webhooks caller now: Stripe.com
    warp::path!("webhooks" / "stripe")
        .and(warp::post())
        .and(with_database_connection_pool(pool))
        .and(with_stripe_signature_header())
        .and(warp::body::bytes())
        .and(with_global_configuration(global_configuration))
        .and(warp::path::end())
        .and_then(warp_server::handlers::webhooks_stripe)
}

/// Combines our `application/json` and `multipart/form-data` GraphQL filters together.
///
/// Note on Warp filters implementation:
///
/// Rejections are meant to say a `Filter` couldn't fulfill its preconditions, but maybe another
/// `Filter` can. If a filter is otherwise fully matched, and an error occurs in your business
/// logic, it's probably not correct to `reject` with the error. In that case, you'd want to
/// construct a `Reply` that describes your error. (source: https://github.com/seanmonstar/warp/issues/388#issuecomment-576453485)
fn graphql(
    pool: &ConnectionPool,
    schema: Schema,
    global_configuration: &GlobalConfiguration,
) -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    let schema = Arc::new(schema); // TODO: is this the right way?
    graphql_post(pool, schema.clone(), global_configuration)
        .or(graphql_multipart(pool, schema, global_configuration))
        .with(
            warp::cors()
                .allow_origin("http://localhost:5001") // abacus-backoffice (DEV without Telepresence)
                .allow_origin("http://localhost:5002") // KOCHKA.com.mx (DEV without Telepresence)
                .allow_origin("https://abacus-backoffice.vercel.app/") // TODO abacus-backoffice (PRODUCTION)
                .allow_headers(vec!["authorization", "content-type", "x-client"])
                .allow_methods(vec![warp::http::Method::POST]),
        )
}

/// POST /graphql with `application/json` body
fn graphql_post(
    pool: &ConnectionPool,
    schema: Arc<Schema>,
    global_configuration: &GlobalConfiguration,
) -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    warp::path!("graphql")
        .and(warp::post())
        .and(with_json_body())
        .and(with_database_connection_pool(pool))
        .and(with_graphql_schema(schema))
        .and(with_authorization_header())
        .and(with_global_configuration(global_configuration))
        .and_then(warp_server::handlers::graphql_post)
}

/// POST /graphql with `multipart/form-data` body (max 5MB allowed)
fn graphql_multipart(
    pool: &ConnectionPool,
    schema: Arc<Schema>,
    global_configuration: &GlobalConfiguration,
) -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    warp::path!("graphql")
        .and(warp::post())
        .and(warp::multipart::form().max_length(
            1024 * 1024 * 5, // 5MB
        ))
        .and(with_database_connection_pool(pool))
        .and(with_graphql_schema(schema))
        .and(with_authorization_header())
        .and(with_global_configuration(global_configuration))
        .and_then(warp_server::handlers::graphql_multipart)
}

fn with_json_body() -> impl Filter<Extract = (GraphQLRequest,), Error = Rejection> + Clone {
    // When accepting a body, we want a JSON body (and to reject huge payloads).
    // TODO: improve this to some smarter validation (query whitelisting)
    let _16kb = 1024 * 16;
    warp::body::content_length_limit(_16kb).and(warp::body::json())
}

fn with_database_connection_pool(
    pool: &ConnectionPool,
) -> impl Filter<Extract = (ConnectionPool,), Error = Infallible> + Clone {
    let pool = pool.to_owned();
    warp::any().map(move || pool.clone())
}

fn with_graphql_schema(
    schema: Arc<Schema>,
) -> impl Filter<Extract = (Arc<Schema>,), Error = Infallible> + Clone {
    warp::any().map(move || schema.clone())
}

fn with_authorization_header(
) -> impl Filter<Extract = (Option<String>,), Error = warp::Rejection> + Clone {
    warp::header::optional::<String>("authorization")
}

fn with_global_configuration(
    global_configuration: &GlobalConfiguration,
) -> impl Filter<Extract = (GlobalConfiguration,), Error = Infallible> + Clone {
    let global_configuration = global_configuration.to_owned();
    warp::any().map(move || global_configuration.clone())
}

fn with_stripe_signature_header(
) -> impl Filter<Extract = (Option<String>,), Error = warp::Rejection> + Clone {
    warp::header::optional::<String>("Stripe-Signature")
}
