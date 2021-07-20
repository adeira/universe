use crate::arangodb::{resolve_aql_vector, ConnectionPool};
use crate::commerce::model::product_categories::ProductCategory;
use crate::locale::SupportedLocale;

pub(in crate::commerce) async fn assign_product_categories(
    pool: &ConnectionPool,
    product_id: &String,
    product_category_ids: &Vec<String>,
    client_locale: &SupportedLocale,
) -> anyhow::Result<Vec<Option<ProductCategory>>> {
    let db = pool.db().await;

    // First, we create graph edges which guarantees us there are created correctly.
    for product_category_id in product_category_ids {
        db.create_graph_edge(
            "product_categories",       // graph
            "product_categories_edges", // edge collection the edge belongs to
            &serde_json::json!({
                "_from": product_id,
                "_to": product_category_id,
            }),
            true,
        )
        .await?;
    }

    // Second, we delete old categories (while excluding the new ones). It's important that the
    // operations are performed in this order because it's better to have the product in more
    // categories than in none for a second.
    resolve_aql_vector(
        &pool,
        r#"
            FOR category,edge IN OUTBOUND @product_id product_categories_edges
              FILTER edge._to NOT IN @product_category_ids
              REMOVE edge IN product_categories_edges

              LET t = FIRST(
                FOR t IN category.translations
                  FILTER t.name != null AND t.locale == @client_locale
                  RETURN t
              )

              RETURN MERGE(
                category,
                { name: t.name }
              )
        "#,
        hashmap_json![
            "product_id" => product_id,
            "product_category_ids" => product_category_ids,
            "client_locale" => client_locale,
        ],
    )
    .await
}

pub(in crate::commerce) async fn search_all_product_categories(
    pool: &ConnectionPool,
    client_locale: &SupportedLocale,
) -> anyhow::Result<Vec<Option<ProductCategory>>> {
    resolve_aql_vector(
        &pool,
        r#"
            FOR product_category IN product_categories
              LET t = FIRST(
                FOR t IN product_category.translations
                  FILTER t.name != null AND t.locale == @client_locale
                  RETURN t
              )

              // LET products = (
              //   LET unit_label_translated = DOCUMENT("product_units/piece")[@client_locale]
              //   FOR product IN INBOUND product_category._id product_categories_edges
              //     LET tp = FIRST(
              //       FOR tp IN product.translations
              //         FILTER tp.name != null AND tp.locale == @client_locale
              //         RETURN tp
              //     )
              //     RETURN MERGE(
              //         product,
              //         { unit_label: unit_label_translated },
              //         { name: tp.name, description: tp.description }
              //       )
              // )

              RETURN MERGE(
                product_category,
                { name: t.name }
              )
        "#,
        hashmap_json![
            "client_locale" => client_locale,
        ],
    )
    .await
}

pub(in crate::commerce) async fn get_product_categories_by_ids(
    pool: &ConnectionPool,
    client_locale: &SupportedLocale,
    product_category_ids: &[String],
) -> anyhow::Result<Vec<Option<ProductCategory>>> {
    resolve_aql_vector(
        &pool,
        r#"
            FOR product_category IN DOCUMENT(product_categories, @product_category_ids)
              LET t = FIRST(
                FOR t IN product_category.translations
                  FILTER t.name != null AND t.locale == @client_locale
                  RETURN t
              )
              RETURN MERGE(
                product_category,
                { name: t.name }
              )
        "#,
        hashmap_json![
            "client_locale" => client_locale,
            "product_category_ids" => product_category_ids,
        ],
    )
    .await
}

/// TODO(004) add integration tests
pub(in crate::commerce) async fn get_assigned_product_categories(
    pool: &ConnectionPool,
    client_locale: &SupportedLocale,
    product_id: &String,
) -> anyhow::Result<Vec<Option<ProductCategory>>> {
    resolve_aql_vector(
        &pool,
        r#"
            FOR category IN OUTBOUND @product_id product_categories_edges
              LET t = FIRST(
                FOR t IN category.translations
                  FILTER t.name != null AND t.locale == @client_locale
                  RETURN t
              )
              RETURN MERGE(
                category,
                { name: t.name }
              )
        "#,
        hashmap_json![
            "product_id" => product_id,
            "client_locale" => client_locale,
        ],
    )
    .await
}
