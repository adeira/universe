use crate::arangodb::pool::ConnectionManager;
use arangors::{ArangoError, ClientError, Connection};
#[cfg(test)]
use deadpool::managed::Object;
use deadpool::managed::Pool;

pub mod errors;
mod pool;

#[derive(Clone)]
pub struct ConnectionPool {
    pub pool: Pool<ConnectionManager>,
    db_name: String,
}

type Database = arangors::Database<uclient::reqwest::ReqwestClient>;

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
    pub async fn connection(&self) -> Object<ConnectionManager> {
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
pub fn get_database_connection_pool(
    arangodb_url: &str,
    arangodb_database: &str,
    arangodb_username: &str,
    arangodb_password: &str,
) -> ConnectionPool {
    // Maximum number of connections ever created.
    // TODO: what should be the actual maximum size?
    // https://github.com/arangodb/arangodb/blob/35c278cdf3b7985f8ed2042dfef8d22c2dd2ed07/arangod/Network/ConnectionPool.h#L65
    let max_pool_size = num_cpus::get_physical() * 4;

    let connection_pool = deadpool::managed::Pool::new(
        pool::ConnectionManager {
            db_host: arangodb_url.to_string(),
            db_name: arangodb_database.to_string(),
            username: arangodb_username.to_string(),
            password: arangodb_password.to_string(),
        },
        max_pool_size,
    );

    tracing::trace!(
        "Creating (empty) database connection pool for: '{}' ({}) 🔥",
        arangodb_database,
        arangodb_url
    );
    ConnectionPool {
        pool: connection_pool,
        db_name: arangodb_database.to_string(),
    }
}

#[cfg(test)]
pub fn get_database_connection_pool_mock() -> ConnectionPool {
    get_database_connection_pool(
        "mock_arangodb_url",
        "mock_arangodb_database",
        "mock_arangodb_username",
        "mock_arangodb_password",
    )
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
    let pool = get_database_connection_pool(
        // TODO: make it more DX/test friendly (?)
        // TODO: dev k8s cluster
        "http://arangodb-single-server.default.svc.cluster.local:8529",
        db_name,
        "",
        "",
    );
    crate::migrations::migrate(&pool).await;
    pool
}

/// This function cleanup the test database by removing it completely.
#[cfg(test)]
pub async fn cleanup_test_database(db_name: &str) -> ConnectionPool {
    let pool = get_database_connection_pool(
        // TODO: make it more DX/test friendly (?)
        // TODO: dev k8s cluster
        "http://arangodb-single-server.default.svc.cluster.local:8529",
        db_name,
        "",
        "",
    );
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
