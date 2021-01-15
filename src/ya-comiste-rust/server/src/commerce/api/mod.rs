use crate::commerce::model::products::Product;
use crate::graphql_context::Context;

pub use crate::commerce::model::products::ProductInput;

#[derive(juniper::GraphQLObject)]
pub struct ProductError {
    message: String,
}

#[derive(juniper::GraphQLUnion)]
pub enum ProductOrError {
    Product(Product),
    ProductError(ProductError),
}

pub(crate) async fn create_product(
    context: &Context,
    product_input: &ProductInput,
) -> ProductOrError {
    match crate::commerce::model::products::create_product(&context, &product_input).await {
        Ok(product) => ProductOrError::Product(product),
        Err(e) => ProductOrError::ProductError(ProductError {
            message: String::from(e),
        }),
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
