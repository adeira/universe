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
            WITH entrypoints, entrypoint_components
            FOR v,edge IN 1..1 OUTBOUND @entrypoint_id GRAPH sdui
              SORT edge.order ASC
              RETURN edge
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
    entrypoint_key: String,
    section_id: String,
    supported: &[String],
) -> Result<Vec<SDUIComponent>, ModelError> {
    let conn = pool.get().await.unwrap(); // TODO: DRY, no unwrap
    let db = conn.db("ya-comiste").await.unwrap(); // TODO: DRY, no unwrap

    let aql = arangors::AqlQuery::builder()
        .query(
            "
            WITH entrypoints, entrypoint_components, components
            FOR vertex,edge IN 1..1 OUTBOUND @entrypoint_key GRAPH sdui
              FILTER edge._id == @section_id
              FILTER vertex.typename IN @supported_typenames
              LIMIT 1
              RETURN {
                _serde_union_tag: vertex.typename,
                _serde_union_content: vertex,
              }
            ",
        )
        .bind_var("entrypoint_key", entrypoint_key)
        .bind_var("section_id", section_id)
        .bind_var("supported_typenames", supported.to_owned())
        .build();

    let result = db.aql_query::<SDUIComponent>(aql).await;
    match result {
        Ok(r) => Ok(r),
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}
