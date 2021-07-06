use crate::arangodb::{resolve_aql, ConnectionPool};
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Deserialize, Serialize)]
pub(crate) struct ArchiveItem {
    _id: String,
    _rev: String,
    _key: String,
    original_id: String,
    original_collection_name: String,
    original_payload: String,
}

/// The purpose or this archivation is to be able to hard-delete documents from DB collections but
/// be able to still keep them in case we need to revert them for example (currently not implemented).
/// These archived structs can be either left there forever or deleted via DB collection TTL Indexes.
///
/// Why not just soft-delete? https://stackoverflow.com/a/2549940/3135248
///
/// Moreover archive + hard-delete offloads the collections in ArangoDB making it more performant.
pub(crate) async fn archive_struct<T>(
    pool: &ConnectionPool,
    original_id: &str,
    original_collection_name: &str,
    original_payload: T,
) -> anyhow::Result<ArchiveItem>
where
    T: Serialize,
{
    let insert_aql = arangors::AqlQuery::builder()
        .query(
            r#"
            INSERT {
              original_id: @original_id,
              original_collection_name: @original_collection_name,
              original_payload: @original_payload,
              created: DATE_ISO8601(DATE_NOW()),
            } INTO archive
            RETURN NEW
            "#,
        )
        .bind_var("original_id", json!(&original_id))
        .bind_var("original_collection_name", json!(&original_collection_name))
        .bind_var(
            "original_payload",
            serde_json::to_string(&original_payload)?,
        )
        .build();

    resolve_aql(&pool, insert_aql).await
}
