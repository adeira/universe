use crate::arangodb::Database;
use crate::arangors::collection::CollectionType;
use crate::migrations::utils::create_collection;

pub async fn migrate(db: &Database) -> anyhow::Result<()> {
    create_collection(
        &db,
        "archive",
        &CollectionType::Document,
        &serde_json::from_str(std::include_str!("json_schemas/archive.json")).unwrap(),
    )
    .await
}
