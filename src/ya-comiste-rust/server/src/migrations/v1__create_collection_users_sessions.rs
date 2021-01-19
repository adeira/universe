use crate::migrations::utils::{create_collection, create_index};
use arangors::collection::CollectionType;
use arangors::index::{Index, IndexSettings};
use arangors::ClientError;

pub async fn migrate(
    db: &arangors::Database<arangors::client::reqwest::ReqwestClient>,
) -> Result<(), ClientError> {
    // 1. create `users` table
    create_collection(
        &db,
        "users",
        &CollectionType::Document,
        &serde_json::from_str(
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
        .unwrap(),
    )
    .await?;

    // 2. create `sessions` table
    create_collection(
        &db,
        "sessions",
        &CollectionType::Document,
        &serde_json::from_str(
            r##"
            {
              "message": "",
              "level": "strict",
              "rule": {
                "type": "object",
                "additionalProperties": false,
                "required": ["last_access", "type"],
                "properties": {
                  "last_access": {
                    "type": "string"
                  },
                  "type": {
                    "type": "string",
                    "enum": ["mobile", "webapp"]
                  }
                }
              }
            }
            "##,
        )
        .unwrap(),
    )
    .await?;

    // 3. create edge between `users` and `sessions`
    create_collection(&db, "user_sessions", &CollectionType::Edge, &None).await?;

    // 4. create TTL index for the sessions
    create_index(
        &db,
        "sessions",
        &Index::builder()
            .name("last_access_mobile_ttl_index") // required in migrations for idempotency
            .fields(vec!["last_access".to_string()])
            .settings(IndexSettings::Ttl {
                // Mobile session token is long-lived (one year = 365 * 24 * 60 * 60)
                expire_after: 31_536_000,
            })
            .build(),
    )
    .await
}
