use crate::arangodb::ConnectionPool;
use crate::graphql_schema::Schema;
use crate::warp_graphql;
use juniper::http::GraphQLRequest;
use std::convert::Infallible;
use std::sync::Arc;
use warp::{Filter, Rejection, Reply};

/// Combines our `application/json` and `multipart/form-data` GraphQL filters together.
///
/// Note on Warp filters implementation:
///
/// Rejections are meant to say a `Filter` couldn't fulfill its preconditions, but maybe another
/// `Filter` can. If a filter is otherwise fully matched, and an error occurs in your business
/// logic, it's probably not correct to `reject` with the error. In that case, you'd want to
/// construct a `Reply` that describes your error. (source: https://github.com/seanmonstar/warp/issues/388#issuecomment-576453485)
pub(crate) fn graphql(
    pool: ConnectionPool,
    schema: Schema,
) -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    let schema = Arc::new(schema); // TODO: is this the right way?
    graphql_post(pool.clone(), schema.clone()).or(graphql_multipart(pool, schema))
}

/// POST /graphql with `application/json` body
fn graphql_post(
    pool: ConnectionPool,
    schema: Arc<Schema>,
) -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    warp::path!("graphql")
        .and(warp::post())
        .and(with_json_body())
        .and(with_database_connection_pool(pool))
        .and(with_graphql_schema(schema))
        .and(with_authorization_header())
        .and_then(warp_graphql::handlers::graphql_post)
}

/// POST /graphql with `multipart/form-data` body (max 5MB allowed)
fn graphql_multipart(
    pool: ConnectionPool,
    schema: Arc<Schema>,
) -> impl Filter<Extract = impl Reply, Error = Rejection> + Clone {
    warp::path!("graphql")
        .and(warp::post())
        .and(warp::multipart::form().max_length(
            1024 * 1024 * 5, // 5MB
        ))
        .and(with_database_connection_pool(pool))
        .and(with_graphql_schema(schema))
        .and(with_authorization_header())
        .and_then(warp_graphql::handlers::graphql_multipart)
}

fn with_json_body() -> impl Filter<Extract = (GraphQLRequest,), Error = Rejection> + Clone {
    // When accepting a body, we want a JSON body (and to reject huge payloads).
    // TODO: improve this to some smarter validation (query whitelisting)
    let _16kb = 1024 * 16;
    warp::body::content_length_limit(_16kb).and(warp::body::json())
}

fn with_database_connection_pool(
    pool: ConnectionPool,
) -> impl Filter<Extract = (ConnectionPool,), Error = Infallible> + Clone {
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
