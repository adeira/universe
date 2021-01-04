use crate::arangodb::ConnectionPool;
use crate::graphql_schema::Schema;
use crate::headers::parse_authorization_header;
use crate::warp_graphql;
use juniper::http::GraphQLRequest;
use std::sync::Arc;
use warp::Filter;

/// The 2 GraphQL filters below combined.
pub(crate) fn graphql(
    pool: ConnectionPool,
    schema: Schema,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    let schema = Arc::new(schema); // TODO: is this the right way?
    graphql_post(pool.clone(), schema.clone()).or(graphql_multipart(pool, schema))
}

/// POST /graphql with 'application/json' body
fn graphql_post(
    pool: ConnectionPool,
    schema: Arc<Schema>,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::path!("graphql")
        .and(warp::post())
        .and(with_json_body())
        .and(with_database_connection_pool(pool))
        .and(with_graphql_schema(schema))
        .and(with_session_token())
        .and_then(warp_graphql::handlers::graphql_post)
}

/// POST /graphql with 'multipart/form-data' body (max 5MB allowed)
fn graphql_multipart(
    pool: ConnectionPool,
    schema: Arc<Schema>,
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
    warp::path!("graphql")
        .and(warp::post())
        .and(warp::multipart::form().max_length(
            1024 * 1024 * 5, // 5MB
        ))
        .and(with_database_connection_pool(pool))
        .and(with_graphql_schema(schema))
        .and(with_session_token())
        .and_then(warp_graphql::handlers::graphql_multipart)
}

fn with_json_body() -> impl Filter<Extract = (GraphQLRequest,), Error = warp::Rejection> + Clone {
    // When accepting a body, we want a JSON body (and to reject huge payloads).
    // TODO: improve this to some smarter validation (query whitelisting)
    let _16kb = 1024 * 16;
    warp::body::content_length_limit(_16kb).and(warp::body::json())
}

fn with_database_connection_pool(
    pool: ConnectionPool,
) -> impl Filter<Extract = (ConnectionPool,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || pool.clone())
}

fn with_graphql_schema(
    schema: Arc<Schema>,
) -> impl Filter<Extract = (Arc<Schema>,), Error = std::convert::Infallible> + Clone {
    warp::any().map(move || schema.clone())
}

fn with_session_token() -> impl Filter<Extract = (Option<String>,), Error = warp::Rejection> + Clone
{
    warp::header::optional::<String>("authorization").map(|auth_header: Option<String>| {
        match auth_header {
            Some(auth_header) => match parse_authorization_header(&*auth_header) {
                Ok(session_token) => Some(session_token),
                Err(_) => None, // TODO: reject instead (?)
            },
            None => None,
        }
    })
}
