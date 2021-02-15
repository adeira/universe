use crate::auth::users::User;
use crate::commerce::model::errors::ModelError;
use crate::graphql_context::Context;
use serde::{Deserialize, Serialize};

/// This design was originally taken from Stripe API but was significantly changed (simplified).
///
/// The prices are currently always "per unit" - see unit amount (other kinds of payment are not
/// supported but can be added, take an inspiration from Stripe).
///
/// # Resources
///
/// - https://help.shopify.com/en/manual/products/add-update-products
/// - https://www.arangodb.com/docs/stable/data-modeling-monetary-data-without-precision-loss.html
#[derive(Clone, Deserialize, Debug)]
pub struct Product {
    _id: String,
    _rev: String,
    _key: String,
    name: Option<String>,        // Option: might be missing translation
    description: Option<String>, // Option: might be missing translation
    images: Vec<String>,
    unit_label: String,
    price: ProductPrice,

    /// Product should not be active until it has all the translations, pictures and other
    /// requirements fulfilled.
    active: bool,
}

// Methods defined by `juniper::graphql_object` cannot be accessed directly from within the Rust code 🤔
impl Product {
    #[cfg(test)]
    pub(in crate::commerce) fn id(&self) -> String {
        self._id.to_owned()
    }

    #[cfg(test)]
    pub(in crate::commerce) fn name(&self) -> Option<String> {
        self.name.to_owned()
    }

    #[cfg(test)]
    pub(in crate::commerce) fn description(&self) -> Option<String> {
        self.description.to_owned()
    }
}

#[juniper::graphql_object]
impl Product {
    /// Product ID is unique in our whole GraphQL universe. Please note however, that it's not URL
    /// friendly.
    fn id(&self) -> juniper::ID {
        juniper::ID::from(self._id.to_owned())
    }

    /// Product KEY is unique only amongst other products but can potentially conflict with other
    /// keys of other types. Use product ID if you want truly unique value.
    fn key(&self) -> juniper::ID {
        juniper::ID::from(self._key.to_owned())
    }

    /// The product’s name, meant to be displayable to the customer.
    fn name(&self) -> Option<String> {
        self.name.to_owned()
    }

    /// The product’s description, meant to be displayable to the customer. Use this field to
    /// optionally store a long form explanation of the product being sold for your own rendering
    /// purposes.
    fn description(&self) -> Option<String> {
        self.description.to_owned()
    }

    /// A list of up to 8 URLs of images for this product, meant to be displayable to the customer.
    fn images(&self) -> Vec<String> {
        self.images.to_owned()
    }

    /// A label that represents units of this product in Stripe and on customers’ receipts and
    /// invoices. When set, this will be included in associated invoice line item descriptions.
    fn unit_label(&self) -> String {
        self.unit_label.to_owned()
    }

    fn price(&self) -> ProductPrice {
        self.price.to_owned()
    }
}

#[derive(juniper::GraphQLEnum, Clone, Deserialize, Debug)]
pub enum SupportedCurrency {
    MXN,
}

#[derive(juniper::GraphQLObject, Clone, Deserialize, Debug)]
struct ProductPrice {
    /// The unit amount in centavo to be charged, represented as a whole integer.
    /// Centavo equals ¹⁄₁₀₀ of the basic monetary unit.
    unit_amount: i32,

    /// Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html).
    unit_amount_currency: SupportedCurrency,
}

/// This type should be used together with GraphQL uploads and it should hold the file names being
/// uploaded. It's used together with the actual uploaded files for validation purposes. Only files
/// which are defined using this scalar will be processed.
#[derive(juniper::GraphQLScalarValue, Clone, Serialize, Deserialize)]
#[graphql(
    transparent,
    description = "
      This type should be used together with GraphQL uploads and it should hold the file names
      being uploaded. It's used together with the actual uploaded files for validation purposes.
      Only files which are defined using this scalar will be processed.
    "
)]
pub(in crate::commerce) struct ProductImageUploadable(String);

impl std::fmt::Display for ProductImageUploadable {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "{}", &self.0)
    }
}

impl From<ProductImageUploadable> for serde_json::Value {
    fn from(f: ProductImageUploadable) -> Self {
        serde_json::Value::String(f.to_string())
    }
}

#[derive(juniper::GraphQLInputObject, Debug)]
pub struct ProductMultilingualInputTranslations {
    pub(in crate::commerce) locale: SupportedLocale,
    pub(in crate::commerce) name: Option<String>,
    pub(in crate::commerce) description: Option<String>,
}

#[derive(juniper::GraphQLInputObject)]
pub struct ProductMultilingualInput {
    pub(in crate::commerce) images: Vec<ProductImageUploadable>,
    // unit_label: String, // TODO: always "piece" at this moment
    pub(in crate::commerce) price: ProductPriceInput,
    pub(in crate::commerce) translations: Vec<ProductMultilingualInputTranslations>,
}

#[derive(juniper::GraphQLInputObject)]
pub struct ProductPriceInput {
    /// The unit amount in centavo to be charged, represented as a whole integer.
    /// Centavo equals ¹⁄₁₀₀ of the basic monetary unit.
    pub(in crate::commerce) unit_amount: i32,

    /// Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html).
    pub(in crate::commerce) unit_amount_currency: SupportedCurrency,
}

/// Takes care of the business logic and forwards the call lower to the DAL layer when everything
/// is OK. Specifically, it validates the input values to make sense and it checks permissions
/// because only admin can create a product.
///
/// # Validation rules
///
/// 1. There must be at least one translation variant available.
/// 3. There must be at least one product name somewhere in all the translation variants.
/// 4. Price cannot be bellow zero (must be positive).
pub(in crate::commerce) async fn create_product(
    context: &Context,
    product_multilingual_input: &ProductMultilingualInput,
) -> Result<Product, ModelError> {
    let translations = &product_multilingual_input.translations;

    // At least one translation variant must exist:
    if translations.is_empty() {
        return Err(ModelError::LogicalError(String::from(
            "Product must have at least one translation variant.",
        )));
    }

    // At least one name in any translation version must exist.
    if let None = translations
        .iter()
        .find(|&translation| translation.name.is_some())
    {
        return Err(ModelError::LogicalError(String::from(
            "Product must have at least one name in any translation version.",
        )));
    }

    // Price must be higher than zero:
    if product_multilingual_input.price.unit_amount < 0 {
        return Err(ModelError::LogicalError(String::from(
            "Product price cannot be smaller than zero.",
        )));
    }

    match &context.user {
        User::AdminUser(_) => {
            crate::commerce::dal::products::create_product(
                &context.pool,
                &product_multilingual_input,
            )
            .await
        }
        _ => Err(ModelError::PermissionsError(String::from(
            "Only admins can create products.",
        ))),
    }
}

#[derive(juniper::GraphQLEnum)]
pub enum PriceSortDirection {
    LowToHigh,
    HighToLow,
}

#[derive(juniper::GraphQLEnum, Serialize, Deserialize, Debug)]
pub enum SupportedLocale {
    #[graphql(name = "en_US")]
    #[serde(rename = "en_US")]
    EnUS,
    #[graphql(name = "es_MX")]
    #[serde(rename = "es_MX")]
    EsMX,
}

impl std::fmt::Display for SupportedLocale {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            SupportedLocale::EnUS => write!(f, "en_US"),
            SupportedLocale::EsMX => write!(f, "es_MX"),
        }
    }
}

pub(in crate::commerce) async fn search_published_products(
    context: &Context,
    client_locale: &SupportedLocale,
    price_sort_direction: &PriceSortDirection,
    search_term: &Option<String>,
) -> Result<Vec<Option<Product>>, ModelError> {
    // Anyone can search the products (it's not limited to admins only).
    crate::commerce::dal::products::search_products(
        &context.pool,
        &client_locale,
        &price_sort_direction,
        &search_term,
        &false, // do not search all (active only)
    )
    .await
}

pub(in crate::commerce) async fn search_all_products(
    context: &Context,
    client_locale: &SupportedLocale,
    price_sort_direction: &PriceSortDirection,
    search_term: &Option<String>,
) -> Result<Vec<Option<Product>>, ModelError> {
    match &context.user {
        User::AdminUser(_) => {
            // Only admin can search all products
            crate::commerce::dal::products::search_products(
                &context.pool,
                &client_locale,
                &price_sort_direction,
                &search_term,
                &true, // search all including inactive
            )
            .await
        }
        _ => Err(ModelError::PermissionsError(String::from(
            "only admin can search all products",
        ))),
    }
}

// TODO: rename to "get_active_product"/"get_activated_product"?
pub(in crate::commerce) async fn get_product(
    context: &Context,
    client_locale: &SupportedLocale,
    product_id: &str,
) -> Result<Product, ModelError> {
    // Anyone can get the product (it's not limited to admins only).
    crate::commerce::dal::products::get_product(
        &context.pool,
        &client_locale,
        &product_id,
        &true, // product must be active to be publicly available
    )
    .await
}

pub(in crate::commerce) async fn update_product() {
    // TODO (authorized only)
    unimplemented!()
}

pub(in crate::commerce) async fn delete_product(
    context: &Context,
    product_id: &str,
) -> Result<Product, ModelError> {
    match &context.user {
        User::AdminUser(_) => {
            crate::commerce::dal::products::delete_product(&context.pool, &product_id).await
        }
        _ => Err(ModelError::PermissionsError(String::from(
            "Only admins can delete products.",
        ))),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn create_product_validation_missing_translations_test() {
        let context = Context::create_mock();
        assert_eq!(
            format!(
                "{:?}",
                create_product(
                    &context,
                    &ProductMultilingualInput {
                        images: vec![],
                        price: ProductPriceInput {
                            unit_amount: -1,
                            unit_amount_currency: SupportedCurrency::MXN
                        },
                        translations: vec![]
                    }
                )
                .await
                .err()
                .unwrap()
            ),
            "LogicalError(\"Product must have at least one translation variant.\")"
        );
    }

    #[tokio::test]
    async fn create_product_validation_missing_name_test() {
        let context = Context::create_mock();
        assert_eq!(
            format!(
                "{:?}",
                create_product(
                    &context,
                    &ProductMultilingualInput {
                        images: vec![],
                        price: ProductPriceInput {
                            unit_amount: -1,
                            unit_amount_currency: SupportedCurrency::MXN
                        },
                        translations: vec![ProductMultilingualInputTranslations {
                            locale: SupportedLocale::EnUS,
                            name: None,
                            description: Some("EN description".to_string())
                        }]
                    }
                )
                .await
                .err()
                .unwrap()
            ),
            "LogicalError(\"Product must have at least one name in any translation version.\")"
        );
    }

    #[tokio::test]
    async fn create_product_validation_price_below_zero_test() {
        let context = Context::create_mock();
        assert_eq!(
            format!(
                "{:?}",
                create_product(
                    &context,
                    &ProductMultilingualInput {
                        images: vec![],
                        price: ProductPriceInput {
                            unit_amount: -1,
                            unit_amount_currency: SupportedCurrency::MXN
                        },
                        translations: vec![ProductMultilingualInputTranslations {
                            locale: SupportedLocale::EnUS,
                            name: Some("EN name".to_string()),
                            description: None
                        }]
                    }
                )
                .await
                .err()
                .unwrap()
            ),
            "LogicalError(\"Product price cannot be smaller than zero.\")"
        );
    }
}
