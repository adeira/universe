use crate::auth::rbac;
use crate::auth::rbac::Actions::Commerce;
use crate::auth::rbac::CommerceActions::GetAllProductCategories;
use crate::graphql_context::Context;
use crate::locale::SupportedLocale;
use serde::{Deserialize, Serialize};

#[derive(Clone, Deserialize, Serialize)]
pub struct ProductCategory {
    _id: Option<String>,  // available only when deserialized from DB
    _rev: Option<String>, // available only when deserialized from DB
    _key: String,
    /// Resolved product category name (from translations based on the eshop locale).
    name: Option<String>, // available only when deserialized from DB
    translations: Vec<ProductCategoryMultilingualTranslations>,
}

#[derive(juniper::GraphQLObject, Debug, Deserialize, Serialize, Clone)]
pub struct ProductCategoryMultilingualTranslations {
    pub(in crate::commerce) locale: SupportedLocale,
    pub(in crate::commerce) name: String,
}

#[juniper::graphql_object]
impl ProductCategory {
    fn id(&self) -> juniper::ID {
        juniper::ID::from(
            self._id
                .as_ref()
                .expect("product category ID should always exist in GraphQL context")
                .to_owned(),
        )
    }

    /// The product category name, meant to be displayable to the customer.
    fn name(&self) -> String {
        self.name
            .as_ref()
            .expect("product category name should always exist in GraphQL context")
            .to_owned()
    }
}

impl ProductCategory {
    pub(crate) fn key_ref(&self) -> &str {
        self._key.as_ref()
    }
}

impl std::fmt::Debug for ProductCategory {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        // skipping `_id`, `_key` and `_rev` which are not stable
        f.debug_struct("ProductCategory")
            .field("name", &self.name)
            .field("translations", &self.translations)
            .finish()
    }
}

pub(in crate::commerce) async fn search_all_product_categories(
    context: &Context,
    client_locale: &SupportedLocale,
) -> anyhow::Result<Vec<Option<ProductCategory>>> {
    rbac::verify_permissions(&context.user, &Commerce(GetAllProductCategories)).await?;

    crate::commerce::dal::product_categories::search_all_product_categories(
        &context.pool,
        &client_locale,
    )
    .await
}

pub(in crate::commerce) async fn get_product_categories_by_ids(
    context: &Context,
    client_locale: &SupportedLocale,
    product_category_ids: &[String],
) -> anyhow::Result<Vec<Option<ProductCategory>>> {
    rbac::verify_permissions(&context.user, &Commerce(GetAllProductCategories)).await?;

    crate::commerce::dal::product_categories::get_product_categories_by_ids(
        &context.pool,
        &client_locale,
        &product_category_ids,
    )
    .await
}
