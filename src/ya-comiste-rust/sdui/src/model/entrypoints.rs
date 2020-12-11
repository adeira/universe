use crate::entrypoint::Entrypoint;
use crate::errors::ModelError;

pub async fn get_entrypoint(
    pool: arangodb::ConnectionPool,
    entrypoint_key: &str,
) -> Result<Entrypoint, ModelError> {
    let db = pool.db().await;

    let aql = arangors::AqlQuery::builder()
        .query(
            "
            WITH entrypoints
            FOR vertex IN entrypoints
              FILTER vertex._key == @entrypoint_key
              RETURN vertex
            ",
        )
        .bind_var("entrypoint_key", entrypoint_key)
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
