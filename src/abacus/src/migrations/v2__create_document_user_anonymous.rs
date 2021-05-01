use crate::migrations::utils::{create_document, ArangoDocument};
use arangors::ClientError;

#[derive(serde::Serialize, serde::Deserialize)]
struct User {
    _key: String,
    r#type: String,
}

impl ArangoDocument for User {
    fn idempotency_key(&self) -> &str {
        &self._key
    }
}

pub async fn migrate(
    db: &arangors::Database<uclient::reqwest::ReqwestClient>,
) -> Result<(), ClientError> {
    let collection_name = "users";
    create_document(
        &db,
        &collection_name,
        User {
            _key: String::from("1"),
            r#type: String::from("anonymous"),
        },
    )
    .await
}
