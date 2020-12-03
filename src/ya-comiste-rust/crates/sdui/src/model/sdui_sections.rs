use crate::errors::ModelError;
use crate::model::entrypoints::get_entrypoint;
use crate::sdui_component::SDUIComponent;
use crate::sdui_section::SDUISection;
use arangodb::connection;

/// Note: this function doesn't return `section.component` on purpose.
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
            LET component = section.component
            SORT section.order ASC
            RETURN {
                id: section._id,
            }
            ",
        )
        .bind_var("entrypoint_id", entrypoint._id.to_string())
        .batch_size(1)
        .build();

    match db.aql_query::<SDUISection>(aql).await {
        Ok(r) => Ok(r),
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}

pub async fn get_section_component(
    section_id: String,
    supported: Vec<String>,
) -> Result<SDUIComponent, ModelError> {
    let conn = connection().await;
    let db = conn.db("ya-comiste").await.unwrap();

    // TODO: change the component ID to be unique (how to 🤔)
    let aql = arangors::AqlQuery::builder()
        .query(
            "
            LET section = DOCUMENT(@section_id)
            LET component = section.component
            FILTER component.typename IN @supported_typenames
            LIMIT 1
            RETURN {
                typename: component.typename,
                id: CONCAT(section._id, '~', component.typename),
            }
            ",
        )
        .bind_var("section_id", section_id)
        .bind_var("supported_typenames", supported)
        .batch_size(1)
        .build();

    match db.aql_query::<SDUIComponent>(aql).await {
        Ok(r) => match r.first() {
            Some(first) => Ok(first.to_owned()),
            None => Err(ModelError::LogicError(
                "no supported component available".to_string(),
            )),
        },
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}
