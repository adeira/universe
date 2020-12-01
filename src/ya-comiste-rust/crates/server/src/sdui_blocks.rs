use crate::sdui::SDUISection;
use arangodb::connection;

pub async fn get_all_blocks(id: juniper::ID) -> Vec<SDUISection> {
    let conn = connection().await;
    let db = conn.db("ya-comiste").await.unwrap();

    // TODO: filter by `supported` arg
    let aql = arangors::AqlQuery::builder()
        .query(
            "
            FOR vertex IN 1..1 OUTBOUND @entrypoint entrypoint_sections
            // FILTER vertex.type IN ['SDUIScrollViewHorizontalComponent']
            SORT vertex.section_order ASC
            RETURN {
                id: vertex._id,
                title: vertex.title,
            }
            ",
        )
        .bind_var("entrypoint", id.to_string())
        .batch_size(1)
        .build();

    return db.aql_query(aql).await.unwrap();
}
