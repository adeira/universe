use crate::arangodb::Database;
use crate::arangors::collection::CollectionType;
use crate::migrations::utils::{create_collection, create_document, ArangoDocument};

#[derive(serde::Serialize, serde::Deserialize)]
struct ProductUnit {
    _key: String,
    en_US: String,
    es_MX: String,
}

impl ArangoDocument for ProductUnit {
    fn idempotency_key(&self) -> &str {
        &self._key
    }
}

pub async fn migrate(db: &Database) -> anyhow::Result<()> {
    create_collection(
        &db,
        "products",
        &CollectionType::Document,
        &serde_json::from_str(std::include_str!("json_schemas/products.json")).unwrap(),
    )
    .await?;

    create_collection(&db, "product_units", &CollectionType::Document, &None).await?;

    create_document(
        &db,
        "product_units",
        ProductUnit {
            _key: String::from("piece"),
            en_US: String::from("piece"),
            es_MX: String::from("pieza"),
        },
    )
    .await
}

#[cfg(test)]
mod tests {
    use serde_json::json;
    use valico::json_schema;

    #[test]
    fn products_json_schema_validation_test() {
        let arangodb_schema = serde_json::from_str::<serde_json::Value>(std::include_str!(
            "json_schemas/products.json"
        ))
        .unwrap();

        let mut scope = json_schema::Scope::new();
        let schema = scope
            .compile_and_return(arangodb_schema.get("rule").unwrap().clone(), false)
            .unwrap();

        // Valid input:
        assert!(schema
            .validate(&json!({
              "images": [],
              "unit_label": "TKTK",
              "is_published": false,
              "created": "TKTK",
              "visibility": ["POS", "ESHOP"],
              "categories": [],
              "updated": "TKTK",
              "price": {
                "unit_amount": 42,
                "unit_amount_currency": "MXN"
              },
              "translations": [
                {
                  "locale": "en_US",
                  "name": "TKTK",
                  "description": "TKTK"
                }
              ]
            }))
            .is_valid());

        // Invalid input (empty strings should not be allowed):
        insta::assert_json_snapshot!(schema.validate(&json!({
          "images": [],
          "unit_label": "",
          "is_published": false,
          "created": "",
          "visibility": [],
          "categories": [""],
          "updated": "",
          "price": {
            "unit_amount": 42,
            "unit_amount_currency": "MXN"
          },
          "translations": [
            {
              "locale": "en_US",
              "name": "",
              "description": ""
            },
            {
              "locale": "es_MX",
              "name": "",
              "description": ""
            }
          ]
        })));

        // missing fields should be captured:
        insta::assert_json_snapshot!(schema.validate(&json!({})));
    }
}
