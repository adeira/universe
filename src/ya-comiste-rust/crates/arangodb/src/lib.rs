mod pool;

const ARANGODB_HOST: &str = "http://127.0.0.1:8529/";
const NORMAL_USERNAME: &str = "ya-comiste-rust"; // TODO: change!
const NORMAL_PASSWORD: &str = ""; // TODO: change!

/// Default ArangoDB (normal) user:
///
/// ```
/// use arangodb::get_normal_user;
/// assert_eq!(get_normal_user(), "ya-comiste-rust")
/// ```
///
/// Custom ArangoDB (normal) user (via ENV):
///
/// ```
/// use arangodb::get_normal_user;
/// std::env::set_var("ARANGO_USER", "yadada");
/// assert_eq!(get_normal_user(), "yadada")
/// ```
pub fn get_normal_user() -> String {
    std::env::var("ARANGO_USER").unwrap_or_else(|_| NORMAL_USERNAME.to_owned())
}

/// Default ArangoDB (normal) password:
///
/// ```
/// use arangodb::get_normal_password;
/// assert_eq!(get_normal_password(), "")
/// ```
///
/// Custom ArangoDB (normal) password (via ENV):
///
/// ```
/// use arangodb::get_normal_password;
/// std::env::set_var("ARANGO_PASSWORD", "custom_pswd");
/// assert_eq!(get_normal_password(), "custom_pswd")
/// ```
pub fn get_normal_password() -> String {
    std::env::var("ARANGO_PASSWORD").unwrap_or_else(|_| NORMAL_PASSWORD.to_owned())
}

/// Default ArangoDB host:
///
/// ```
/// use arangodb::get_arangodb_host;
/// assert_eq!(get_arangodb_host(), "http://127.0.0.1:8529/")
/// ```
///
/// Custom ArangoDB host (via ENV):
///
/// ```
/// use arangodb::get_arangodb_host;
/// std::env::set_var("ARANGODB_HOST", "0.0.0.0:1234");
/// assert_eq!(get_arangodb_host(), "http://0.0.0.0:1234")
/// ```
pub fn get_arangodb_host() -> String {
    std::env::var("ARANGODB_HOST")
        .map(|s| format!("http://{}", s))
        .unwrap_or_else(|_| ARANGODB_HOST.to_owned())
}

pub type ConnectionPool = deadpool::managed::Pool<arangors::Connection, arangors::ClientError>;
pub fn get_database_connection_pool() -> ConnectionPool {
    let host = get_arangodb_host();
    let username = get_normal_user();
    let password = get_normal_password();

    deadpool::managed::Pool::new(
        pool::ConnectionManager {
            host,
            username,
            password,
        },
        16, // maximum number of connections ever created (TODO: what should be the maximum size realistically?)
    )
}
