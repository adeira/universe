pub use crate::commerce::model::products::PriceSortDirection;
pub use crate::commerce::model::products::Product;
pub use crate::commerce::model::products::ProductMultilingualInput;
pub use crate::commerce::model::products::ProductMultilingualInputVisibility;
pub use crate::commerce::model::products::SupportedLocale;

use crate::commerce::model::errors::ModelError;
use crate::graphql_context::Context;

#[derive(juniper::GraphQLObject)]
pub struct ProductError {
    message: String,
}

#[derive(juniper::GraphQLUnion)]
pub enum ProductOrError {
    Product(Product),
    ProductError(ProductError),
}

/// Exposes the create product API publicly to be used in GraphQL (or any other API as a matter of fact).
pub(crate) async fn create_product(
    context: &Context,
    product_multilingual_input: &ProductMultilingualInput,
) -> ProductOrError {
    match crate::commerce::model::products::create_product(&context, &product_multilingual_input)
        .await
    {
        Ok(product) => ProductOrError::Product(product),
        Err(e) => ProductOrError::ProductError(ProductError {
            message: e.to_string(),
        }),
    }
}

pub(crate) async fn search_published_products(
    context: &Context,
    client_locale: &SupportedLocale,
    price_sort_direction: &PriceSortDirection,
    search_term: &Option<String>,
    visibility: &ProductMultilingualInputVisibility,
) -> Option<Vec<Option<Product>>> {
    match crate::commerce::model::products::search_published_products(
        &context,
        &client_locale,
        &price_sort_direction,
        &search_term,
        &visibility,
    )
    .await
    {
        Ok(products) => Some(products),
        Err(e) => {
            tracing::error!("{}", e);
            None
        }
    }
}

pub(crate) async fn search_all_products(
    context: &Context,
    client_locale: &SupportedLocale,
    price_sort_direction: &PriceSortDirection,
    search_term: &Option<String>,
) -> Option<Vec<Option<Product>>> {
    match crate::commerce::model::products::search_all_products(
        &context,
        &client_locale,
        &price_sort_direction,
        &search_term,
    )
    .await
    {
        Ok(products) => Some(products),
        Err(e) => {
            tracing::error!("{}", e);
            None
        }
    }
}

pub(crate) async fn get_product_by_key(
    context: &Context,
    client_locale: &SupportedLocale,
    product_key: &str,
) -> Result<Product, ModelError> {
    crate::commerce::model::products::get_product_by_key(&context, &client_locale, &product_key)
        .await
}

pub(crate) async fn delete_product(context: &Context, product_key: &str) -> ProductOrError {
    match crate::commerce::model::products::delete_product(&context, &product_key).await {
        Ok(product) => ProductOrError::Product(product),
        Err(e) => ProductOrError::ProductError(ProductError {
            message: e.to_string(),
        }),
    }
}
