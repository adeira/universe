use crate::errors::ModelError;
use crate::sdui_content::SDUIContent;

pub async fn get_component_content(
    pool: &arangodb::ConnectionPool,
    component_id: &str,
) -> Result<SDUIContent, ModelError> {
    let db = pool.db().await;

    let aql = arangors::AqlQuery::builder()
        .query(
            "
            WITH components, component_content, restaurants, shops
            FOR vertex IN 1..1 OUTBOUND @component_id GRAPH sdui_content
            LIMIT 1
            RETURN {
              _serde_union_tag: PARSE_IDENTIFIER(vertex._id).collection,
              _serde_union_content: vertex,
            }
            ",
        )
        .bind_var("component_id", component_id)
        .build();

    match db.aql_query::<SDUIContent>(aql).await {
        Ok(r) => match r.first() {
            Some(content) => Ok(content.to_owned()),
            None => Err(ModelError::LogicError(format!(
                "No component content returned for component ID '{}'",
                component_id
            ))),
        },
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}
