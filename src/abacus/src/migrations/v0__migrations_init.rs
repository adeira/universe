use crate::migrations::utils::create_collection;
use arangors::collection::CollectionType;
use arangors::ClientError;

pub async fn migrate(
    db: &arangors::Database<arangors::client::reqwest::ReqwestClient>,
) -> Result<(), ClientError> {
    let collection_name = "migrations";
    create_collection(&db, &collection_name, &CollectionType::Document, &None).await
}
