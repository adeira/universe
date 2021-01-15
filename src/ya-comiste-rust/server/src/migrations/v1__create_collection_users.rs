use crate::migrations::utils::create_collection;
use arangors::collection::CollectionType;
use arangors::ClientError;

pub async fn migrate(
    db: &arangors::Database<arangors::client::reqwest::ReqwestClient>,
) -> Result<(), ClientError> {
    let collection_name = "users";
    let json_schema = serde_json::from_str(
        r##"
        {
          "message": "",
          "level": "strict",
          "rule": {
            "type": "object",
            "additionalProperties": false,
            "required": [
              "type"
            ],
            "properties": {
              "type": {
                "type": "string",
                "enum": [
                  "anonymous",
                  "regular",
                  "admin"
                ]
              },
              "google": {
                "type": "object",
                "additionalProperties": true,
                "required": [
                  "sub"
                ],
                "properties": {
                  "sub": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
        "##,
    )
    .unwrap();

    create_collection(
        &db,
        &collection_name,
        &CollectionType::Document,
        &json_schema,
    )
    .await
}
