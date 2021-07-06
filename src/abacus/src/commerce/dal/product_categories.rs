use crate::arangodb::{resolve_aql_vector, ConnectionPool};
use crate::commerce::model::product_categories::ProductCategory;
use crate::locale::SupportedLocale;

pub(in crate::commerce) async fn search_all_product_categories(
    pool: &ConnectionPool,
    client_locale: &SupportedLocale,
) -> anyhow::Result<Vec<Option<ProductCategory>>> {
    let search_aql = arangors::AqlQuery::builder().query(
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
    );

    resolve_aql_vector(
        &pool,
        search_aql
            .bind_var("client_locale", format!("{}", client_locale))
            .build(),
    )
    .await
}
