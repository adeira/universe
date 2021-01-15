use crate::migrations::utils::create_document;
use arangors::ClientError;

#[derive(serde::Serialize, serde::Deserialize)]
struct User {
    _key: String,
    r#type: String,
}

pub async fn migrate(
    db: &arangors::Database<arangors::client::reqwest::ReqwestClient>,
) -> Result<(), ClientError> {
    let collection_name = "users";
    create_document(
        &db,
        &collection_name,
        User {
            _key: String::from("1"),
            r#type: String::from("anonymous"),
        },
        "1",
    )
    .await
}
