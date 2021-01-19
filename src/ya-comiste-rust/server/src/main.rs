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
mod sdui;

mod models {
    use crate::arangodb::ConnectionPool;
    use crate::auth::users::{AnonymousUser, User};

    pub(crate) async fn get_current_user(
        pool: &ConnectionPool,
        session_token: &Option<String>,
    ) -> User {
        match session_token {
            Some(session_token) => {
                match crate::auth::resolve_user_from_session_token(&pool, &session_token).await {
                    User::AdminUser(user) => {
                        log::info!("Using admin user: {} 👍👍", user.id());
                        User::AdminUser(user)
                    }
                    User::AnonymousUser(user) => {
                        // TODO: should at this point anonymous user be considered an error (?)
                        log::info!("Using anonymous user (unmatched session token) 👊");
                        User::AnonymousUser(user)
                    }
                    User::AuthorizedUser(user) => {
                        log::info!("Using authorized user: {} 👍", user.id());
                        User::AuthorizedUser(user)
                    }
                }
            }
            None => {
                log::warn!("Using anonymous user (unable to extract 'authorization' header) 👎");
                User::AnonymousUser(AnonymousUser::new())
            }
        }
    }
}

mod handlers {
    use futures::stream::TryStreamExt;
    use juniper::http::GraphQLRequest;
    use std::convert::Infallible;
    use std::sync::Arc;
    use warp::filters::multipart::{FormData, Part};
    use warp::http::StatusCode;

    use crate::arangodb::ConnectionPool;
    use crate::graphql_context::Context;
    use crate::graphql_schema::Schema;
    use crate::models::get_current_user;
    use crate::sdui::model::component_content::get_content_dataloader;

    pub(crate) async fn graphql_post(
        request: GraphQLRequest,
        pool: ConnectionPool,
        schema: Arc<Schema>,
        session_token: Option<String>,
    ) -> Result<impl warp::Reply, Infallible> {
        let user = get_current_user(&pool, &session_token).await;
        let context = Context {
            pool: pool.clone(),
            content_dataloader: get_content_dataloader(&user, &pool),
            user, // TODO: should be only authorized OR anonymous (not unathorized?)
        };
        let response = request.execute(&schema, &context).await;
        Ok(warp::reply::json(&response)) // TODO: take `response.is_ok()` into account
    }

    pub(crate) async fn graphql_multipart(
        form_data: FormData,
        _pool: ConnectionPool,
    ) -> Result<impl warp::Reply, Infallible> {
        let parts: Result<Vec<Part>, warp::Error> = form_data.try_collect().await;
        // TODO: implement (https://blog.logrocket.com/file-upload-and-download-in-rust/)
        //  - process the query (via `graphql_post`)
        //  - process the files (limit `content_type` and file size)
        //  - upload to S3 and save into DB with conputed blurhash
        Ok(StatusCode::NOT_IMPLEMENTED)
    }
}

mod filters {
    use crate::arangodb::ConnectionPool;
    use crate::graphql_schema::Schema;
    use crate::headers::parse_authorization_header;
    use juniper::http::GraphQLRequest;
    use std::sync::Arc;
    use warp::Filter;

    /// The 2 filters combined.
    pub(crate) fn graphql(
        pool: ConnectionPool,
        schema: Schema,
    ) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
        let schema = Arc::new(schema); // TODO: is this the right way?
        let post_json_schema = schema.clone();
        graphql_post(pool.clone(), post_json_schema).or(graphql_multipart(pool))
    }

    /// POST /graphql with JSON body
    pub(crate) fn graphql_post(
        pool: ConnectionPool,
        schema: Arc<Schema>,
    ) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
        warp::path!("graphql")
            .and(warp::post())
            .and(with_json_body())
            .and(with_database_connection_pool(pool))
            .and(with_graphql_schema(schema))
            .and(with_session_token())
            .and_then(crate::handlers::graphql_post)
    }

    /// POST /graphql-upload with form multipart
    pub(crate) fn graphql_multipart(
        pool: ConnectionPool,
    ) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
        warp::path!("graphql-upload")
            .and(warp::post())
            .and(warp::multipart::form())
            .and(with_database_connection_pool(pool))
            .and_then(crate::handlers::graphql_multipart)
    }

    fn with_json_body() -> impl Filter<Extract = (GraphQLRequest,), Error = warp::Rejection> + Clone
    {
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

    fn with_session_token(
    ) -> impl Filter<Extract = (Option<String>,), Error = warp::Rejection> + Clone {
        warp::header::optional::<String>("authorization").map(|auth_header: Option<String>| {
            match auth_header {
                Some(auth_header) => match parse_authorization_header(&*auth_header) {
                    Ok(session_token) => Some(session_token),
                    Err(_) => None,
                },
                None => None,
            }
        })
    }
}

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
    let api = filters::graphql(pool, schema);
    let routes = api.with(warp::log("warp_server")).with(cors);

    let socket = SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 8080);
    log::info!(target: "warp_server", "Listening on {}", socket);
    // TODO: how to fetch these routes automatically (?)
    log::info!(target: "warp_server", " - POST /graphql          (JSON)");
    log::info!(target: "warp_server", " - POST /graphql-upload   (multipart)");
    warp::serve(routes).run(socket).await
}

#[cfg(test)]
mod tests;
