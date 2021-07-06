use crate::migrations::utils::{create_document, ArangoDocument};

#[derive(serde::Serialize, serde::Deserialize)]
struct User {
    _key: String,
    is_active: bool,
}

impl ArangoDocument for User {
    fn idempotency_key(&self) -> &str {
        &self._key
    }
}

pub async fn migrate(
    db: &arangors::Database<uclient::reqwest::ReqwestClient>,
) -> anyhow::Result<()> {
    let collection_name = "users";
    create_document(
        &db,
        &collection_name,
        User {
            _key: String::from("1"),
            is_active: true,
        },
    )
    .await
}
