use crate::arangors::collection::CollectionType;
use crate::arangors::DatabaseType;
use crate::migrations::utils::create_collection;

pub async fn migrate(db: &DatabaseType) -> anyhow::Result<()> {
    create_collection(&db, "tracking", &CollectionType::Edge, &None).await
}
