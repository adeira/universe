use deadpool::managed::Pool;

pub mod errors;
mod pool;

const ARANGODB_HOST: &str = "http://127.0.0.1:8529/";
const NORMAL_USERNAME: &str = "ya-comiste-rust"; // TODO: change!
const NORMAL_PASSWORD: &str = ""; // TODO: change!
const PRODUCTION_DB_NAME: &str = "ya-comiste";

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

#[derive(Clone)]
pub struct ConnectionPool {
    pub pool: Pool<arangors::Connection, arangors::ClientError>,
}

type Database = arangors::Database<arangors::client::reqwest::ReqwestClient>;

impl ConnectionPool {
    pub async fn db(&self) -> Database {
        let status = &self.pool.status();
        log::trace!(
            "Connection pool status: max_size={}, size={}, available={}",
            // The maximum size of the pool
            status.max_size,
            // The current size of the pool
            status.size,
            // The number of available objects in the pool. If there are no objects in the pool
            // this number can become negative and stores the number of futures waiting for an object.
            status.available
        );

        // We use `unwrap` (`expect`) here because not being able to access the database is an
        // unrecoverable situation and we want to panic. Not sure what to do otherwise (?).
        let connection = &self
            .pool
            .get()
            .await
            .expect("could not get database connection from the pool");

        connection
            .db(PRODUCTION_DB_NAME)
            .await
            .expect("could not access production database")
    }
}

pub fn get_database_connection_pool() -> ConnectionPool {
    let host = get_arangodb_host();
    let username = get_normal_user();
    let password = get_normal_password();

    // Maximum number of connections ever created.
    // TODO: what should be the actual maximum size?
    // https://github.com/arangodb/arangodb/blob/35c278cdf3b7985f8ed2042dfef8d22c2dd2ed07/arangod/Network/ConnectionPool.h#L65
    let max_pool_size = num_cpus::get_physical() * 4;

    let connection_pool = deadpool::managed::Pool::new(
        pool::ConnectionManager {
            host,
            username,
            password,
        },
        max_pool_size,
    );

    log::trace!("Creating (empty) database connection pool 🔥");
    ConnectionPool {
        pool: connection_pool,
    }
}
