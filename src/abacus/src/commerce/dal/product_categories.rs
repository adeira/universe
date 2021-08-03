use crate::arango::{resolve_aql_vector, ConnectionPool};
use crate::commerce::model::product_categories::ProductCategory;
use crate::locale::SupportedLocale;

pub(in crate::commerce) async fn assign_product_categories(
    pool: &ConnectionPool,
    product_id: &str,
    product_category_ids: &[String],
    client_locale: &SupportedLocale,
) -> anyhow::Result<()> {
    let db = pool.db().await;

    // First, we delete ALL old categories so we can save new set of categories. Also, this way, we
    // won't assign one category twice by accident.
    resolve_aql_vector::<ProductCategory>(
        pool,
        r#"
            FOR category,edge IN OUTBOUND @product_id product_categories_edges
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
            "client_locale" => client_locale,
        ],
    )
    .await?;

    // Second, we create graph edges with the new categories.
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

    Ok(())
}

pub(in crate::commerce) async fn search_all_product_categories(
    pool: &ConnectionPool,
    client_locale: &SupportedLocale,
) -> anyhow::Result<Vec<Option<ProductCategory>>> {
    resolve_aql_vector(
        pool,
        r#"
            FOR product_category IN product_categories
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
        pool,
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
    product_id: &str,
) -> anyhow::Result<Vec<Option<ProductCategory>>> {
    resolve_aql_vector(
        pool,
        r#"
            WITH product_categories
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
