use crate::arango::collection::CollectionType;
use crate::arango::DatabaseType;
use crate::migrations::utils::create_collection;

pub async fn migrate(db: &DatabaseType) -> anyhow::Result<()> {
    create_collection(
        db,
        "archive",
        &CollectionType::Document,
        &serde_json::from_str(std::include_str!("json_schemas/archive.json")).unwrap(),
    )
    .await
}
