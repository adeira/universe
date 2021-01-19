use crate::migrations::utils::create_collection;
use arangors::collection::CollectionType;
use arangors::ClientError;

pub async fn migrate(
    db: &arangors::Database<arangors::client::reqwest::ReqwestClient>,
) -> Result<(), ClientError> {
    create_collection(
        &db,
        "images",
        &CollectionType::Document,
        &serde_json::from_str(
            r##"
            {
              "message": "",
              "level": "strict",
              "rule": {
                "type": "object",
                "additionalProperties": false,
                "required": ["filename", "blurhash"],
                "properties": {
                  "filename": {
                    "type": "string"
                  },
                  "blurhash": {
                    "type": "string"
                  }
                }
              }
            }
            "##,
        )
        .unwrap(),
    )
    .await
}
