use crate::arangodb::ConnectionPool;
use arangors::AqlQuery;
use serde::{Deserialize, Serialize};

#[derive(Debug)]
pub enum Error {
    LogicalError(String),
    DatabaseError(String),
}

async fn resolve_aql<T: for<'de> Deserialize<'de> + Clone>(
    pool: &ConnectionPool,
    aql: AqlQuery<'_>,
) -> Result<T, Error> {
    let db = pool.db().await;
    let result_vector = db.aql_query::<T>(aql).await;
    match result_vector {
        Ok(result_vector) => match result_vector.first() {
            Some(result) => Ok(result.to_owned()),
            None => Err(Error::LogicalError(String::from(
                "database didn't return any record",
            ))),
        },
        Err(e) => Err(Error::DatabaseError(format!("{:?}", e))),
    }
}

#[derive(Serialize, Deserialize, Clone)]
pub struct PosCheckout {
    _id: String,
}

impl PosCheckout {
    pub fn id(&self) -> String {
        self._id.to_owned()
    }
}

/// Saves checkout information into database so we know what sales are happening via POS and we can
/// make further decisions based on that. Specifically, we record the following information:
///
/// - date and time of the POS sale
/// - products sold (not only IDs but the whole expanded products so future changes of these
///   products don't affect this POS history)
/// - price for each product at the time of the sale (again, preserving historic state)
pub(in crate::pos) async fn create_checkout(pool: &ConnectionPool) -> Result<PosCheckout, Error> {
    // TODO: save other POS checkout information

    let insert_aql = arangors::AqlQuery::builder()
        .query(
            r#"
            INSERT {
              created_date: DATE_ISO8601(DATE_NOW()),
            } INTO pos_checkouts
            RETURN NEW
            "#,
        )
        .build();

    resolve_aql::<PosCheckout>(&pool, insert_aql).await
}
