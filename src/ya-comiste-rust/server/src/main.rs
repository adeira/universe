use arangodb::get_database_connection_pool;
use sdui::graphql_context::Context;
use sdui::graphql_schema::create_graphql_schema;
use warp::Filter;

#[tokio::main]
async fn main() {
    std::env::set_var("RUST_LOG", "warp_server,arangodb=trace,sdui=info");
    env_logger::init();

    // Create database connection wrapper only once per application lifetime!
    let database_connection_pool = get_database_connection_pool();

    let context_extractor = warp::any()
        .map(move || Context {
            pool: database_connection_pool.to_owned(),
        })
        .boxed();

    let graphql_filter =
        juniper_warp::make_graphql_filter(create_graphql_schema(), context_extractor);
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
