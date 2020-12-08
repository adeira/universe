use crate::errors::ModelError;
use crate::model::entrypoints::get_entrypoint;
use crate::sdui_component::SDUIComponent;
use crate::sdui_section::SDUISection;

pub async fn get_all_sections_for_entrypoint_key(
    pool: arangodb::ConnectionPool,
    entrypoint_key: String,
) -> Result<Vec<SDUISection>, ModelError> {
    let conn = pool.get().await.unwrap(); // TODO: DRY, no unwrap
    let db = conn.db("ya-comiste").await.unwrap(); // TODO: DRY, no unwrap

    let entrypoint = get_entrypoint(pool, &entrypoint_key).await?;
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
    pool: arangodb::ConnectionPool,
    section_id: String,
    supported: Vec<String>,
) -> Result<Vec<SDUIComponent>, ModelError> {
    let conn = pool.get().await.unwrap(); // TODO: DRY, no unwrap
    let db = conn.db("ya-comiste").await.unwrap(); // TODO: DRY, no unwrap

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
