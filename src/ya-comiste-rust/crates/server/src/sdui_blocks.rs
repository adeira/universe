use arangodb::connection;
use sdui::errors::ModelError;
use sdui::model::entrypoints::get_entrypoint;
use sdui::sdui_section::SDUISection;

pub async fn get_all_sections(entrypoint_key: String) -> Result<Vec<SDUISection>, ModelError> {
    let conn = connection().await;
    let db = conn.db("ya-comiste").await.unwrap();

    let entrypoint = get_entrypoint(&entrypoint_key).await?;
    let aql = arangors::AqlQuery::builder()
        .query(
            "
            FOR vertex IN 1..1 OUTBOUND @entrypoint_id entrypoint_sections
            FILTER vertex.type IN @supported_vertex_types
            SORT vertex.section_order ASC
            RETURN {
                id: vertex._id,
                title: vertex.title,
            }
            ",
        )
        .bind_var("entrypoint_id", entrypoint._id.to_string())
        .bind_var(
            "supported_vertex_types",
            vec!["SDUIScrollViewHorizontalComponent"], // TODO: filter by actual `supported` arg
        )
        .batch_size(1)
        .build();

    match db.aql_query::<SDUISection>(aql).await {
        Ok(r) => Ok(r),
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}
