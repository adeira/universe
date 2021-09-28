use crate::arango::collection::CollectionType;
use crate::arango::DatabaseType;
use crate::migrations::utils::create_collection;

pub async fn migrate(db: &DatabaseType) -> anyhow::Result<()> {
    create_collection(db, "analytics_redirects", &CollectionType::Document, &None).await
}
