use crate::errors::ModelError;
use crate::model::entrypoints::get_entrypoint;
use crate::sdui_component::SDUIComponent;
use crate::sdui_section::SDUISection;
use crate::user::User;

pub async fn get_all_sections_for_entrypoint_key(
    user: &User, // TODO: use the current user
    pool: &arangodb::ConnectionPool,
    entrypoint_key: &str,
) -> Result<Vec<SDUISection>, ModelError> {
    let db = pool.db().await;

    let entrypoint = get_entrypoint(user, pool, &entrypoint_key).await?;
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
    user: &User, // TODO: use the current user
    pool: &arangodb::ConnectionPool,
    entrypoint_key: &str,
    section_id: &str,
    supported: &[String],
) -> Result<Vec<SDUIComponent>, ModelError> {
    let db = pool.db().await;

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
        .bind_var("entrypoint_key", entrypoint_key.to_owned())
        .bind_var("section_id", section_id.to_owned())
        .bind_var("supported_typenames", supported.to_owned())
        .build();

    let result = db.aql_query::<SDUIComponent>(aql).await;
    match result {
        Ok(r) => Ok(r),
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}
