use crate::arango::{resolve_aql_vector, ConnectionPool};
use crate::commerce::model::product_addons::ProductAddon;
use crate::locale::SupportedLocale;

/// TODO(004) - integration tests
pub(in crate::commerce) async fn search_product_addons(
    pool: &ConnectionPool,
    client_locale: &SupportedLocale,
) -> anyhow::Result<Vec<Option<ProductAddon>>> {
    resolve_aql_vector(
        pool,
        r#"
            FOR product_addon IN product_addons
              LET t = FIRST(
                FOR t IN product_addon.translations
                  FILTER t.name != null AND t.locale == @client_locale
                  RETURN t
              )
              SORT t.name ASC
              RETURN MERGE(
                product_addon,
                { name: t.name }
              )
        "#,
        hashmap_json![
            "client_locale" => client_locale
        ],
    )
    .await
}

/// TODO(004) - integration tests
pub(in crate::commerce) async fn get_product_addons_by_ids(
    pool: &ConnectionPool,
    client_locale: &SupportedLocale,
    product_addon_ids: &[String],
) -> anyhow::Result<Vec<Option<ProductAddon>>> {
    resolve_aql_vector(
        pool,
        r#"
            FOR product_addon IN DOCUMENT(product_addons, @product_addon_ids)
              LET t = FIRST(
                FOR t IN product_addon.translations
                  FILTER t.name != null AND t.locale == @client_locale
                  RETURN t
              )
              RETURN MERGE(
                product_addon,
                { name: t.name }
              )
        "#,
        hashmap_json![
            "product_addon_ids" => product_addon_ids,
            "client_locale" => client_locale
        ],
    )
    .await
}
