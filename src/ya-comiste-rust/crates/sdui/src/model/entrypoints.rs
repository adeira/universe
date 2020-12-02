use crate::entrypoint::Entrypoint;
use crate::errors::ModelError;
use arangodb::connection;

pub async fn get_all_entrypoints() -> Result<Vec<Entrypoint>, ModelError> {
    let conn = connection().await;
    let db = conn.db("ya-comiste").await.unwrap();

    let aql = arangors::AqlQuery::builder()
        .query(
            "
            FOR entrypoint IN entrypoints
            RETURN {
                _id: entrypoint._id,
                _key: entrypoint._key,
            }
            ",
        )
        .batch_size(1)
        .build();

    match db.aql_query::<Entrypoint>(aql).await {
        Ok(r) => Ok(r),
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}

pub async fn get_entrypoint(entrypoint_key: &str) -> Result<Entrypoint, ModelError> {
    // TODO: DRY the connection
    let conn = connection().await;
    let db = conn.db("ya-comiste").await.unwrap();

    let aql = arangors::AqlQuery::builder()
        .query(
            "
            FOR entrypoint IN entrypoints
            FILTER entrypoint._key == @entrypoint_key
            RETURN {
                _id: entrypoint._id,
                _key: entrypoint._key,
            }
            ",
        )
        .bind_var("entrypoint_key", entrypoint_key)
        .batch_size(1)
        .build();

    match db.aql_query::<Entrypoint>(aql).await {
        Ok(r) => match r.first() {
            Some(entrypoint) => Ok(entrypoint.to_owned()),
            None => Err(ModelError::LogicError(format!(
                "unknown entrypoint key '{}'",
                entrypoint_key
            ))),
        },
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}
