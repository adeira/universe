use arangors::{ArangoError, ClientError, Connection};
#[cfg(test)]
use deadpool::managed::Object;
use deadpool::managed::Pool;

pub mod errors;
mod pool;

const ARANGODB_HOST: &str = "http://127.0.0.1:8529/";
const NORMAL_USERNAME: &str = "abacus"; // TODO: change!
const NORMAL_PASSWORD: &str = ""; // TODO: change!

/// Default ArangoDB (normal) user:
///
/// ```
/// use arangodb::get_normal_user;
/// assert_eq!(get_normal_user(), "abacus")
/// ```
///
/// Custom ArangoDB (normal) user (via ENV):
///
/// ```
/// use arangodb::get_normal_user;
/// std::env::set_var("ARANGO_USER", "yadada");
/// assert_eq!(get_normal_user(), "yadada")
/// ```
fn get_normal_user() -> String {
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
fn get_normal_password() -> String {
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
fn get_arangodb_host() -> String {
    std::env::var("ARANGODB_HOST")
        .map(|s| format!("http://{}", s))
        .unwrap_or_else(|_| ARANGODB_HOST.to_owned())
}

#[derive(Clone)]
pub struct ConnectionPool {
    pub pool: Pool<Connection, ClientError>,
    db_name: String,
}

type Database = arangors::Database<arangors::client::reqwest::ReqwestClient>;

impl ConnectionPool {
    pub async fn db(&self) -> Database {
        let status = &self.pool.status();
        tracing::trace!(
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

        get_or_create_db(&connection, &self.db_name).await
    }

    #[cfg(test)]
    pub async fn connection(&self) -> Object<Connection, ClientError> {
        self.pool
            .get()
            .await
            .expect("could not get database connection from the pool")
    }
}

async fn get_or_create_db(connection: &Connection, db_name: &str) -> Database {
    match connection.db(db_name).await {
        Ok(database) => database,
        Err(ClientError::Arango(ArangoError { .. })) => {
            // TODO: check 1228 - ERROR_ARANGO_DATABASE_NOT_FOUND code
            // https://www.arangodb.com/docs/stable/appendix-error-codes.html
            tracing::info!("🥶 Cold start - creating a new database 🥶");
            connection
                .create_database(db_name)
                .await
                .unwrap_or_else(|_| panic!("could not create '{}' database", db_name))
        }
        Err(error) => {
            panic!("could not access '{}' database: {:?}", db_name, error)
        }
    }
}

/// Database name `None` indicates that the test doesn't actually need a database and should fail
/// if the application tries to access it anyway.
pub fn get_database_connection_pool(db_name: &str) -> ConnectionPool {
    // Maximum number of connections ever created.
    // TODO: what should be the actual maximum size?
    // https://github.com/arangodb/arangodb/blob/35c278cdf3b7985f8ed2042dfef8d22c2dd2ed07/arangod/Network/ConnectionPool.h#L65
    let max_pool_size = num_cpus::get_physical() * 4;

    let connection_pool = deadpool::managed::Pool::new(
        pool::ConnectionManager {
            db_host: get_arangodb_host(),
            db_name: db_name.to_string(),
            username: get_normal_user(),
            password: get_normal_password(),
        },
        max_pool_size,
    );

    tracing::trace!(
        "Creating (empty) database connection pool for: '{}' 🔥",
        db_name
    );
    ConnectionPool {
        pool: connection_pool,
        db_name: db_name.to_string(),
    }
}

#[cfg(test)]
pub fn get_database_connection_pool_mock() -> ConnectionPool {
    get_database_connection_pool("mock_database_name")
}

/// Creates an empty database for test purposes. Each test should define custom `db_name` to
/// avoid conflicts with other tests. The following steps are performed:
///
/// 1) the DB is deleted (if it already exists for some reason)
/// 2) database migrations are applied
///
/// TODO: how to properly construct the `db_name` to keep it sane?
#[cfg(test)]
pub async fn prepare_empty_test_database(db_name: &str) -> ConnectionPool {
    cleanup_test_database(db_name).await;
    let pool = get_database_connection_pool(db_name);
    crate::migrations::migrate(&pool).await;
    pool
}

/// This function cleanup the test database by removing it completely.
#[cfg(test)]
pub async fn cleanup_test_database(db_name: &str) -> ConnectionPool {
    let pool = get_database_connection_pool(db_name);
    let connection = pool.connection().await;
    if connection.db(&db_name).await.is_ok() {
        // database already exists, let's delete it
        connection
            .drop_database(db_name) // Should we throw if it already exists?
            .await
            .unwrap_or_else(|_| panic!("Could not delete the test database: {}", db_name));
    }
    pool
}
