use crate::migrations::utils::create_collection;
use arangors::collection::CollectionType;
use arangors::ClientError;

pub async fn migrate(
    db: &arangors::Database<arangors::client::reqwest::ReqwestClient>,
) -> Result<(), ClientError> {
    let json_schema_sessions = serde_json::from_str(
        r##"
        {
          "message": "",
          "level": "strict",
          "rule": {
            "type": "object",
            "additionalProperties": false,
            "required": ["last_access"],
            "properties": {
              "last_access": {
                "type": "string"
              }
            }
          }
        }
        "##,
    )
    .unwrap();

    // collection for sessions
    create_collection(
        &db,
        "sessions",
        &CollectionType::Document,
        &json_schema_sessions,
    )
    .await?;

    // edge between users and sessions
    create_collection(&db, "user_sessions", &CollectionType::Edge, &None).await
}
