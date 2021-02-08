use crate::migrations::utils::{create_collection, create_document, ArangoDocument};
use arangors::collection::CollectionType;
use arangors::ClientError;

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

pub async fn migrate(
    db: &arangors::Database<arangors::client::reqwest::ReqwestClient>,
) -> Result<(), ClientError> {
    let json_schema_products = serde_json::from_str(
        r##"
        {
          "message": "",
          "level": "strict",
          "rule": {
            "type": "object",
            "additionalProperties": false,
            "required": ["images", "unit_label", "active", "created", "updated", "price", "translations"],
            "properties": {
              "images": {
                "type": "array",
                "items": {
                  "type": "string",
                  "minLength": 1
                }
              },
              "unit_label": {
                "type": "string",
                  "minLength": 1
              },
              "active": {
                "type": "boolean"
              },
              "created": {
                "type": "string",
                  "minLength": 1
              },
              "updated": {
                "type": "string",
                  "minLength": 1
              },
              "price": {
                "type": "object",
                "additionalProperties": false,
                "required": ["currency", "unit_amount"],
                "properties": {
                  "currency": {
                    "type": "string",
                    "minLength": 1,
                    "enum": ["mxn"]
                  },
                  "unit_amount": {
                    "type": "number"
                  }
                }
              },
              "translations": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "en_US": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": ["name", "description"],
                    "properties": {
                      "name": {
                        "type": ["string", "null"],
                        "minLength": 1
                      },
                      "description": {
                        "type": ["string", "null"],
                        "minLength": 1
                      }
                    }
                  },
                  "es_MX": {
                    "type": "object",
                    "additionalProperties": false,
                    "required": ["name", "description"],
                    "properties": {
                      "name": {
                        "type": ["string", "null"],
                        "minLength": 1
                      },
                      "description": {
                        "type": ["string", "null"],
                        "minLength": 1
                      }
                    }
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
        "products",
        &CollectionType::Document,
        &json_schema_products,
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
