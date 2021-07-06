use crate::migrations::utils::create_collection;
use arangors::collection::CollectionType;
use arangors::ClientError;

// TODO: use anyhow::Error
pub async fn migrate(
    db: &arangors::Database<uclient::reqwest::ReqwestClient>,
) -> Result<(), ClientError> {
    create_collection(
        &db,
        "archive",
        &CollectionType::Document,
        &serde_json::from_str(std::include_str!("json_schemas/archive.json")).unwrap(),
    )
    .await
}
