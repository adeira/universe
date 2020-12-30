use crate::arangodb::{get_database_connection_pool, ConnectionPool};
use crate::auth::users::{AnonymousUser, User};
use crate::headers::parse_authorization_header;
use crate::sdui::graphql_context::Context;
use crate::sdui::graphql_schema::create_graphql_schema;
use crate::sdui::model::component_content::get_content_dataloader;
use warp::Filter;

mod arangodb;
mod auth;
mod headers;
mod sdui;

#[tokio::main]
async fn main() {
    std::env::set_var(
        "RUST_LOG",
        "warp_server,arangodb=trace,auth=trace,sdui=trace,server=trace",
    );
    env_logger::builder().format_timestamp(None).init();

    // Create database connection wrapper only once per application lifetime so we can reuse it
    // for the following requests. DO NOT create it in the GraphQL context extractor!
    let database_connection_pool = get_database_connection_pool();

    fn with_database_connection_pool(
        pool: ConnectionPool,
    ) -> impl Filter<Extract = (ConnectionPool,), Error = std::convert::Infallible> + Clone {
        warp::any().map(move || pool.clone())
    }

    let context_extractor = warp::any()
        .and(with_database_connection_pool(database_connection_pool))
        .and(warp::header::optional::<String>("authorization"))
        .and_then(
            |pool: ConnectionPool, auth_header: Option<String>| async move {
                let user: User = match auth_header {
                    Some(auth_header) => {
                        match parse_authorization_header(&*auth_header) {
                            Ok(session_token) => {
                                match auth::resolve_user_from_session_token(&pool, &session_token).await {
                                    // TODO: should at this point anonymous/unauthorized user be considered an error (?)
                                    User::AnonymousUser(user) => {
                                        log::info!("Using anonymous user 👊");
                                        User::AnonymousUser(user)
                                    }
                                    User::AuthorizedUser(user) => {
                                        log::info!("Using authorized user: {} 👍", user.id());
                                        User::AuthorizedUser(user)
                                    }
                                    User::UnauthorizedUser(user) => {
                                        User::UnauthorizedUser(user)
                                    }
                                }
                            }
                            Err(_) => {
                                log::warn!("Using anonymous user (unable to extract 'authorization' header) 👎");
                                User::AnonymousUser(AnonymousUser::new())
                            }
                        }
                    }
                    None => {
                        log::warn!("Using anonymous user (no 'authorization' header) 👎");
                        User::AnonymousUser(AnonymousUser::new())
                    }
                };
                Ok::<Context, std::convert::Infallible>(Context {
                    pool: pool.to_owned(),
                    content_dataloader: get_content_dataloader(&user, &pool),
                    user, // TODO: should be only authorized OR anonymous (not unathorized?)
                })
            },
        )
        .boxed();

    let cors = warp::cors()
        .allow_any_origin() // TODO
        .allow_headers(vec!["x-client", "content-type"])
        .allow_methods(vec![warp::http::Method::POST]);
    let log = warp::log("warp_server");

    let filter = warp::post()
        .and(warp::path("graphql"))
        .and(juniper_warp::make_graphql_filter(
            create_graphql_schema(),
            context_extractor,
        ))
        .with(cors)
        .with(log);

    log::info!(target: "warp_server", "Listening on 127.0.0.1:8080/graphql");
    warp::serve(filter).run(([127, 0, 0, 1], 8080)).await
}
