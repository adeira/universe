use crate::migrations::utils::create_collection;
use arangors::collection::CollectionType;

pub async fn migrate(
    db: &arangors::Database<uclient::reqwest::ReqwestClient>,
) -> anyhow::Result<()> {
    let collection_name = "migrations";
    create_collection(&db, &collection_name, &CollectionType::Document, &None).await
}
