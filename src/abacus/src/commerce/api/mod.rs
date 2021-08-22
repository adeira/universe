pub use crate::commerce::model::product_categories::ProductCategory;
pub use crate::commerce::model::products::PriceSortDirection;
pub use crate::commerce::model::products::Product;
pub use crate::commerce::model::products::ProductMultilingualInput;
pub use crate::commerce::model::products::ProductMultilingualInputVisibility;

use crate::commerce::model::product_addons::ProductAddon;
use crate::graphql::AbacusGraphQLResult;
use crate::graphql_context::Context;
use crate::locale::SupportedLocale;

#[derive(juniper::GraphQLObject)]
pub struct ProductError {
    message: String,
}

#[derive(juniper::GraphQLUnion)]
#[graphql(context = Context)]
pub enum ProductOrError {
    Product(Product),
    ProductError(ProductError),
}

pub(crate) struct CommerceQuery;
pub(crate) struct CommerceMutation;

#[juniper::graphql_object(context = Context)]
impl CommerceQuery {
    /// Searches ALL products (published and unpublished) anywhere in the system (no visibility
    /// restrictions). Optionally, you can specify categories you'd like to filter instead of
    /// returning all products. The specified categories must be valid (they must exist).
    ///
    /// This query requires admin permissions so it should be used only in backoffice to
    /// administer the products.
    async fn search_all_products(
        context: &Context,
        client_locale: SupportedLocale,
        price_sort_direction: PriceSortDirection,
        categories: Option<Vec<juniper::ID>>,
    ) -> AbacusGraphQLResult<Vec<Option<Product>>> {
        match categories {
            Some(categories) => Ok(
                crate::commerce::model::products::search_all_products_in_categories(
                    context,
                    &client_locale,
                    &price_sort_direction,
                    &categories,
                )
                .await?,
            ),
            None => Ok(crate::commerce::model::products::search_all_products(
                context,
                &client_locale,
                &price_sort_direction,
            )
            .await?),
        }
    }

    /// Searches all published products for the specified visibility. The permission requirements
    /// depend on the visibility (for example, ESHOP is public but POS is private).
    ///
    /// Optionally, you can specify categories you'd like to filter instead of
    /// returning all products. The specified categories must be valid (they must exist).
    async fn search_all_published_products(
        context: &Context,
        client_locale: SupportedLocale,
        price_sort_direction: PriceSortDirection,
        visibility: ProductMultilingualInputVisibility, // TODO: default value (public ESHOP)
        categories: Option<Vec<juniper::ID>>,
    ) -> AbacusGraphQLResult<Vec<Option<Product>>> {
        match categories {
            Some(categories) => Ok(
                crate::commerce::model::products::search_all_published_products_in_categories(
                    context,
                    &client_locale,
                    &price_sort_direction,
                    &categories,
                    &visibility,
                )
                .await?,
            ),
            None => Ok(
                crate::commerce::model::products::search_all_published_products(
                    context,
                    &client_locale,
                    &price_sort_direction,
                    &visibility,
                )
                .await?,
            ),
        }
    }

    /// Returns ALL available product categories that can be applied to any product.
    async fn search_all_product_categories(
        context: &Context,
        client_locale: SupportedLocale,
    ) -> AbacusGraphQLResult<Vec<Option<ProductCategory>>> {
        Ok(
            crate::commerce::model::product_categories::search_all_product_categories(
                context,
                &client_locale,
            )
            .await?,
        )
    }

    /// Returns ALL available product addons that can be assigned to products.
    async fn search_all_product_addons(
        context: &Context,
        client_locale: SupportedLocale,
    ) -> AbacusGraphQLResult<Vec<Option<ProductAddon>>> {
        Ok(
            crate::commerce::model::product_addons::search_all_product_addons(
                context,
                &client_locale,
            )
            .await?,
        )
    }

    /// Returns one publicly available product by its key. Anyone can call this resolver.
    async fn get_published_product_by_key(
        context: &Context,
        client_locale: SupportedLocale,
        product_key: juniper::ID,
    ) -> AbacusGraphQLResult<Product> {
        Ok(
            crate::commerce::model::products::get_published_product_by_key(
                context,
                &client_locale,
                &product_key,
            )
            .await?,
        )
    }

    /// Only admins can call this function! It returns published OR unpublished product by its key.
    async fn get_unpublished_product_by_key(
        context: &Context,
        client_locale: SupportedLocale,
        product_key: juniper::ID,
    ) -> AbacusGraphQLResult<Product> {
        Ok(
            crate::commerce::model::products::get_unpublished_product_by_key(
                context,
                &client_locale,
                &product_key,
            )
            .await?,
        )
    }
}

#[juniper::graphql_object(context = Context)]
impl CommerceMutation {
    /// Creates a new product.
    ///
    /// Note on uploading product images: image names specified in the GraphQL input must correspond
    /// to the uploadables (multipart/form-data) and vice versa. Requests with invalid uploadables
    /// will be rejected.
    async fn product_create(
        context: &Context,
        client_locale: SupportedLocale,
        product_multilingual_input: ProductMultilingualInput,
    ) -> ProductOrError {
        match crate::commerce::model::products::create_product(
            context,
            &client_locale,
            &product_multilingual_input,
        )
        .await
        {
            Ok(product) => ProductOrError::Product(product),
            Err(e) => ProductOrError::ProductError(ProductError {
                // TODO: do not expose DB and RBAC errors directly
                message: e.to_string(),
            }),
        }
    }

    /// Updates already existing product with new values. It requires not only product KEY but also
    /// product REVISION to avoid lost update situations (when someone else tried to update the
    /// product and this update would overwrite the latest changes).
    ///
    /// Note on updating product images: already existing image names must be send to the server
    /// otherwise they will be deleted. You can optionally specify some extra (new) images to upload
    /// them via uploadables. This feature will eventually be used even for images re-ordering.
    async fn product_update(
        context: &Context,
        client_locale: SupportedLocale,
        product_key: juniper::ID,
        product_revision: juniper::ID,
        product_multilingual_input: ProductMultilingualInput,
    ) -> ProductOrError {
        match crate::commerce::model::products::update_product(
            context,
            &client_locale,
            &product_key,
            &product_revision,
            &product_multilingual_input,
        )
        .await
        {
            Ok(product) => ProductOrError::Product(product),
            Err(e) => ProductOrError::ProductError(ProductError {
                // TODO: do not expose DB and RBAC errors directly
                message: e.to_string(),
            }),
        }
    }

    /// Archives product based on the product KEY making it effectively inaccessible. From the user
    /// perspective it's like deleting the product, however, internally the product still exists in
    /// the archive and could potentially be restored.
    ///
    /// Note: the product cannot be searched for and cannot be retrieved in any way (other than via
    /// the archive). It can also be hard deleted without prior notice.
    async fn product_archive(
        context: &Context,
        product_key: juniper::ID,
        client_locale: SupportedLocale,
    ) -> ProductOrError {
        match crate::commerce::model::products::archive_product(
            context,
            &product_key,
            &client_locale,
        )
        .await
        {
            Ok(product) => ProductOrError::Product(product),
            Err(e) => ProductOrError::ProductError(ProductError {
                // TODO: do not expose DB and RBAC errors directly
                message: e.to_string(),
            }),
        }
    }

    /// Publishes product based on the product KEY. Various validation requirements must be met
    /// before the product can be published. Published product is available outside of backoffice.
    async fn product_publish(
        context: &Context,
        product_key: juniper::ID,
        client_locale: SupportedLocale,
    ) -> ProductOrError {
        match crate::commerce::model::products::publish_product(
            context,
            &product_key,
            &client_locale,
        )
        .await
        {
            Ok(product) => ProductOrError::Product(product),
            Err(e) => ProductOrError::ProductError(ProductError {
                // TODO: do not expose DB and RBAC errors directly
                message: e.to_string(),
            }),
        }
    }

    /// Unpublishes product based on the product KEY. Unpublished products are available only inside
    /// the backoffice.
    async fn product_unpublish(
        context: &Context,
        product_key: juniper::ID,
        client_locale: SupportedLocale,
    ) -> ProductOrError {
        match crate::commerce::model::products::unpublish_product(
            context,
            &product_key,
            &client_locale,
        )
        .await
        {
            Ok(product) => ProductOrError::Product(product),
            Err(e) => ProductOrError::ProductError(ProductError {
                // TODO: do not expose DB and RBAC errors directly
                message: e.to_string(),
            }),
        }
    }
}

// This function is exposed to GraphQL commerce module as well as to Menu module (hence not inlined).
pub(crate) async fn get_published_products_by_keys(
    context: &Context,
    client_locale: &SupportedLocale,
    product_keys: &[String],
) -> anyhow::Result<Vec<Product>> {
    crate::commerce::model::products::get_published_products_by_keys(
        context,
        client_locale,
        product_keys,
    )
    .await
}
