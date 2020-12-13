use arangors::{ClientError, Connection};
use deadpool::managed::{Manager, RecycleError};

pub struct ConnectionManager {
    pub host: String,
    pub username: String,
    pub password: String,
}

/// Opening a new database connection every time one is both inefficient and can lead to
/// resource exhaustion under high traffic conditions. A connection pool maintains a set
/// of open connections to a database, handing them out for repeated use.
///
/// This connection pool uses [Deadpool](https://github.com/bikeshedder/deadpool) in its managed
/// form. Here is how it behaves at the moment:
///
/// - It starts the pool at the beginning of the application lifetime and opens the connections
///   as needed (but only when needed).
/// - When the application reaches maximum allowed connection number, other requests for a new
///   connection are queued and waiting for it to be available. This means that the application
///   might be responding slowly when it's choking. We might change this to panic instead (?).
#[async_trait::async_trait]
impl Manager<Connection, ClientError> for ConnectionManager {
    /// Creates a new instance of the ArangoDB connection.
    async fn create(&self) -> Result<Connection, ClientError> {
        log::trace!("Creating a new ArangoDB connection 💎");
        let connection =
            arangors::Connection::establish_basic_auth(&self.host, &self.username, &self.password);
        match connection.await {
            Ok(connection) => Ok(connection),
            Err(err) => Err(err),
        }
    }

    /// Tries to recycle a connection returning `Err` if the object could not be recycled.
    async fn recycle(
        &self,
        conn: &mut Connection,
    ) -> deadpool::managed::RecycleResult<ClientError> {
        match conn.db("ya-comiste").await {
            Ok(db) => match db.aql_str::<i8>("RETURN 1").await {
                Ok(result) => match result {
                    _ if result[0] == 1 => {
                        log::trace!("Recycling existing ArangoDB connection ♻️");
                        Ok(()) // recycle ✅
                    }
                    _ => {
                        log::error!("Unable to recycle the connection (DB response invalid) 🙅");
                        Err(RecycleError::Message(
                            "unable to recycle the connection".to_string(),
                        ))
                    }
                },
                Err(err) => {
                    log::error!("Unable to recycle the connection (DB query unsuccessful) 🙅");
                    Err(RecycleError::Message(err.to_string()))
                }
            },
            Err(err) => {
                log::error!("Unable to recycle the connection (DB unreachable) 🙅");
                Err(RecycleError::Message(err.to_string()))
            }
        }
    }
}
