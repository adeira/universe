use crate::arango::{resolve_aql_vector, ConnectionPool};
use crate::commerce::model::product_addons::ProductAddon;
use crate::locale::SupportedLocale;

/// The following function creates a payment that is awaiting payment. It should not be processed
/// yet until we actually receive the money (confirmation from Stripe.com).
///
/// TODO(004) - integration tests
pub(in crate::commerce) async fn create_unpaid_order(
    pool: &ConnectionPool,
    client_locale: &SupportedLocale,
) -> anyhow::Result<Vec<Option<ProductAddon>>> {
    resolve_aql_vector(
        pool,
        r#"
            TODO
        "#,
        hashmap_json![
            "client_locale" => client_locale
        ],
    )
    .await
}
