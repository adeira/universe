use crate::migrations::utils::create_collection;
use arangors::collection::CollectionType;

pub async fn migrate(
    db: &arangors::Database<uclient::reqwest::ReqwestClient>,
) -> anyhow::Result<()> {
    create_collection(&db, "tracking", &CollectionType::Edge, &None).await
}
