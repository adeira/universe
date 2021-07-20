use crate::arangodb::Database;
use crate::arangors::collection::CollectionType;
use crate::migrations::utils::create_collection;

pub async fn migrate(db: &Database) -> anyhow::Result<()> {
    let collection_name = "migrations";
    create_collection(&db, &collection_name, &CollectionType::Document, &None).await
}
