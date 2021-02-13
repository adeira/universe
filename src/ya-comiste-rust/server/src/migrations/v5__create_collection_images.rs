use crate::migrations::utils::create_collection;
use arangors::collection::CollectionType;
use arangors::ClientError;

pub async fn migrate(
    db: &arangors::Database<arangors::client::reqwest::ReqwestClient>,
) -> Result<(), ClientError> {
    create_collection(
        &db,
        "images",
        &CollectionType::Document,
        &serde_json::from_str(std::include_str!("json_schemas/images.json")).unwrap(),
    )
    .await
}
