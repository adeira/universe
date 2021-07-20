use crate::arangodb::Database;
use crate::arangors::collection::CollectionType;
use crate::arangors::graph::{EdgeDefinition, Graph};
use crate::commerce::api::ProductCategory;
use crate::graphql_schema::create_graphql_schema;
use crate::migrations::utils::{
    create_collection, create_document, create_graph, create_graph_vertex, ArangoDocument,
};

impl ArangoDocument for ProductCategory {
    fn idempotency_key(&self) -> &str {
        self.key_ref()
    }
}

pub async fn migrate(db: &Database) -> anyhow::Result<()> {
    create_collection(&db, "product_categories", &CollectionType::Document, &None).await?;

    // For example:
    //  _from:products/4575963 (for example Americano)
    //  _to:product_categories/coffee
    create_collection(
        &db,
        "product_categories_edges",
        &CollectionType::Edge,
        &None,
    )
    .await?;

    create_graph(
        &db,
        Graph::builder()
            .name(String::from("product_categories"))
            .edge_definitions(vec![EdgeDefinition {
                collection: String::from("product_categories_edges"),
                from: vec![String::from("products")],
                to: vec![String::from("product_categories")],
            }])
            .build(),
    )
    .await?;

    create_graph_vertex(
        &db,
        "product_categories", // graph
        "product_categories", // collection
        &serde_json::from_str::<ProductCategory>(
            r#"{
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
            }"#,
        )?,
    )
    .await?;

    create_graph_vertex(
        &db,
        "product_categories", // graph
        "product_categories", // collection
        &serde_json::from_str::<ProductCategory>(
            r#"{
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
            }"#,
        )?,
    )
    .await?;

    create_graph_vertex(
        &db,
        "product_categories", // graph
        "product_categories", // collection
        &serde_json::from_str::<ProductCategory>(
            r#"{
              "_key": "dumplings",
              "translations": [
                {
                  "locale": "en_US",
                  "name": "dumplings"
                },
                {
                  "locale": "es_MX",
                  "name": "dumplings"
                }
              ]
            }"#,
        )?,
    )
    .await?;

    create_graph_vertex(
        &db,
        "product_categories", // graph
        "product_categories", // collection
        &serde_json::from_str::<ProductCategory>(
            r#"{
              "_key": "other",
              "translations": [
                {
                  "locale": "en_US",
                  "name": "other"
                },
                {
                  "locale": "es_MX",
                  "name": "otro"
                }
              ]
            }"#,
        )?,
    )
    .await
}
