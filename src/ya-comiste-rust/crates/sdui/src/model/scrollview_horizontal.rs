use crate::errors::ModelError;
use crate::sdui_card_component::SDUICardComponent;
use arangodb::connection;

pub async fn get_card_components(component_id: &str) -> Result<Vec<SDUICardComponent>, ModelError> {
    let conn = connection().await;
    let db = conn.db("ya-comiste").await.unwrap();

    let aql = arangors::AqlQuery::builder()
        .query(
            "
            FOR component IN 1..1 OUTBOUND @component_id component_components
            FILTER component.typename == 'SDUICardComponent'
            RETURN component
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
