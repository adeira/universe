use crate::errors::ModelError;
use crate::model::entrypoints::get_entrypoint;
use crate::sdui_component::SDUIComponent;
use crate::sdui_section::SDUISection;
use arangodb::connection;

pub async fn get_all_sections_for_entrypoint_key(
    entrypoint_key: String,
) -> Result<Vec<SDUISection>, ModelError> {
    let conn = connection().await;
    let db = conn.db("ya-comiste").await.unwrap();

    let entrypoint = get_entrypoint(&entrypoint_key).await?;
    let aql = arangors::AqlQuery::builder()
        .query(
            "
            FOR section IN 1..1 OUTBOUND @entrypoint_id entrypoint_sections
            SORT section.order ASC
            RETURN section
            ",
        )
        .bind_var("entrypoint_id", entrypoint._id.to_string())
        .build();

    match db.aql_query::<SDUISection>(aql).await {
        Ok(r) => Ok(r),
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}

pub async fn get_section_components(
    section_id: String,
    supported: Vec<String>,
) -> Result<Vec<SDUIComponent>, ModelError> {
    let conn = connection().await;
    let db = conn.db("ya-comiste").await.unwrap();

    let aql = arangors::AqlQuery::builder()
        .query(
            "
            FOR component IN 1..1 OUTBOUND @section_id section_components
            FILTER component.typename IN @supported_typenames
            LIMIT 1
            RETURN {
                _serde_union_tag: component.typename,
                _serde_union_content: component,
            }
            ",
        )
        .bind_var("section_id", section_id)
        .bind_var("supported_typenames", supported)
        .build();

    let result = db.aql_query::<SDUIComponent>(aql).await;
    match result {
        Ok(r) => Ok(r),
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}
