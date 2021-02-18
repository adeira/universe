use crate::graphql_context::Context;

pub use crate::commerce::model::products::PriceSortDirection;
pub use crate::commerce::model::products::Product;
pub use crate::commerce::model::products::ProductMultilingualInput;
pub use crate::commerce::model::products::ProductMultilingualInputVisibility;
pub use crate::commerce::model::products::SupportedLocale;

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
            message: String::from(e),
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
        Err(_) => None, // TODO: log this error (?)
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
        Err(_) => None, // TODO: log this error (?)
    }
}

pub(crate) async fn get_product(
    context: &Context,
    client_locale: &SupportedLocale,
    product_id: &str,
) -> Option<Product> {
    let product =
        crate::commerce::model::products::get_product(&context, &client_locale, &product_id).await;
    match product {
        Ok(product) => Some(product),
        Err(_) => None, // TODO: log this error (?)
    }
}

pub(crate) async fn delete_product(context: &Context, product_id: &str) -> ProductOrError {
    match crate::commerce::model::products::delete_product(&context, &product_id).await {
        Ok(product) => ProductOrError::Product(product),
        Err(e) => ProductOrError::ProductError(ProductError {
            message: String::from(e),
        }),
    }
}
