use crate::commerce::api::ProductCategory;
use crate::migrations::utils::{create_collection, create_document, ArangoDocument};
use arangors::collection::CollectionType;
use arangors::ClientError;

impl ArangoDocument for ProductCategory {
    fn idempotency_key(&self) -> &str {
        self.key_ref()
    }
}

pub async fn migrate(
    db: &arangors::Database<uclient::reqwest::ReqwestClient>,
) -> Result<(), ClientError> {
    create_collection(&db, "product_categories", &CollectionType::Document, &None).await?;

    create_document(
        &db,
        "product_categories",
        serde_json::from_str::<ProductCategory>(
            r#"
            {
              "_key": "coffee",
              "translations": [
                {
                  "locale": "en_US",
                  "name": "coffee"
                },
                {
                  "locale": "es_MX",
                  "name": "café"
                }
              ]
            }
            "#,
        )?,
    )
    .await?;

    create_document(
        &db,
        "product_categories",
        serde_json::from_str::<ProductCategory>(
            r#"
            {
              "_key": "tea",
              "translations": [
                {
                  "locale": "en_US",
                  "name": "tea"
                },
                {
                  "locale": "es_MX",
                  "name": "té"
                }
              ]
            }
            "#,
        )?,
    )
    .await
}
