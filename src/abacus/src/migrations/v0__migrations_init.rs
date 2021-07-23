use crate::arango::collection::CollectionType;
use crate::arango::DatabaseType;
use crate::migrations::utils::create_collection;

pub async fn migrate(db: &DatabaseType) -> anyhow::Result<()> {
    let collection_name = "migrations";
    create_collection(&db, &collection_name, &CollectionType::Document, &None).await
}
