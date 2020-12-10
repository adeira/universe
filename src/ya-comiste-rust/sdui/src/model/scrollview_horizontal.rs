use crate::errors::ModelError;
use crate::sdui_card_component::SDUICardComponent;

pub async fn get_card_components(
    pool: arangodb::ConnectionPool,
    component_id: &str,
) -> Result<Vec<SDUICardComponent>, ModelError> {
    let conn = pool.get().await.unwrap(); // TODO: DRY, no unwrap
    let db = conn.db("ya-comiste").await.unwrap(); // TODO: DRY, no unwrap

    let aql = arangors::AqlQuery::builder()
        .query(
            "
            WITH component_components, components
            FOR vertex IN 1..1 OUTBOUND @component_id GRAPH sdui
              FILTER vertex.typename == 'SDUICardComponent'
              RETURN vertex
            ",
        )
        .bind_var("component_id", component_id)
        .build();

    let result = db.aql_query::<SDUICardComponent>(aql).await;
    match result {
        Ok(r) => Ok(r),
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}
