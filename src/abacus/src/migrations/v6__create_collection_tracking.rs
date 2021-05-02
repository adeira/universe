use crate::migrations::utils::create_collection;
use arangors::collection::CollectionType;
use arangors::ClientError;

pub async fn migrate(
    db: &arangors::Database<uclient::reqwest::ReqwestClient>,
) -> Result<(), ClientError> {
    create_collection(&db, "tracking", &CollectionType::Edge, &None).await
}
