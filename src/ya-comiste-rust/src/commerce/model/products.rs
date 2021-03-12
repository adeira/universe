use crate::auth::users::User;
use crate::commerce::model::errors::ModelError;
use crate::graphql_context::Context;
use crate::images::Image;
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
#[derive(Clone, Deserialize)]
pub struct Product {
    _id: String,
    _rev: String,
    _key: String,
    /// Resolved product name (from translations based on the eshop locale).
    name: String,
    /// Resolved product description (from translations based on the eshop locale).
    description: Option<String>,
    images: Vec<Image>,
    unit_label: String,
    /// Product should not be published until it has all the translations, pictures and other
    /// requirements fulfilled.
    is_published: bool,
    visibility: Vec<ProductMultilingualInputVisibility>,
    price: ProductPrice,
    translations: Vec<ProductMultilingualTranslations>,
}

impl std::fmt::Debug for Product {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        // skipping `_id`, `_key` and `_rev` which are not stable
        f.debug_struct("Product")
            .field("name", &self.name)
            .field("description", &self.description)
            .field("images", &self.images)
            .field("unit_label", &self.unit_label)
            .field("is_published", &self.is_published)
            .field("visibility", &self.visibility)
            .field("price", &self.price)
            .field("translations", &self.translations)
            .finish()
    }
}

// Methods defined by `juniper::graphql_object` cannot be accessed directly from within the Rust code 🤔
impl Product {
    pub(crate) fn id(&self) -> String {
        self._id.to_owned()
    }

    pub(crate) fn key(&self) -> String {
        self._key.to_owned()
    }

    pub(crate) fn name(&self) -> String {
        self.name.to_owned()
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

    /// The read-only `revision` value should be used as a pre-condition for mutations, to avoid
    /// "lost update" situations when editing the product. That is, if a client fetches a product
    /// from the server, modifies it locally (but with the `revision` value untouched) and sends it
    /// back to the server to update the product, but meanwhile the product was changed by another
    /// operation, then the revisions do not match anymore and the operation is cancelled by the
    /// server. Without this mechanism, the client would accidentally overwrite changes made
    /// to the product without knowing about it.
    ///
    /// When an existing product is updated or replaced successfully, our database will create a
    /// new revision value. From a user perspective, there is just one single product revision
    /// present per different `key` at every point in time. There is no built-in system to
    /// automatically keep a history of all changes done to a product and old versions of a
    /// product can not be restored via the `revision` value.
    ///
    /// For more information see: https://www.arangodb.com/docs/stable/data-modeling-documents-document-address.html#document-revision
    fn revision(&self) -> juniper::ID {
        juniper::ID::from(self._rev.to_owned())
    }

    /// The product's name, meant to be displayable to the customer.
    fn name(&self) -> String {
        self.name.to_owned()
    }

    /// The product's description, meant to be displayable to the customer. Use this field to
    /// optionally store a long form explanation of the product being sold for your own rendering
    /// purposes.
    fn description(&self) -> Option<String> {
        self.description.to_owned()
    }

    /// A list of images for this product, meant to be displayable to the customer. You can get
    /// image cover via `imageCover` field.
    fn images(&self) -> Vec<Image> {
        self.images.to_owned()
    }

    /// Returns the most important image which should be displayed as a product cover. Other images
    /// are available under field `images`.
    fn image_cover(&self) -> Option<&Image> {
        self.images.first()
    }

    /// A label that represents units of this product in Stripe and on customers’ receipts and
    /// invoices. When set, this will be included in associated invoice line item descriptions.
    fn unit_label(&self) -> String {
        self.unit_label.to_owned()
    }

    fn price(&self) -> ProductPrice {
        self.price.to_owned()
    }

    fn is_published(&self) -> bool {
        self.is_published.to_owned()
    }

    fn visibility(&self) -> Vec<ProductMultilingualInputVisibility> {
        self.visibility.to_owned()
    }

    /// Exposes all available product translations. What is the difference between `translations`
    /// and `name`/`description`? Name and description are localized based on the eshop locale,
    /// however, translations are all the available translations ignoring the locale.
    fn translations(&self) -> Vec<ProductMultilingualTranslations> {
        self.translations.to_owned()
    }
}

#[derive(juniper::GraphQLEnum, Clone, Serialize, Deserialize, Debug, Copy)]
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
pub(crate) struct ProductImageUploadable(String);

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

#[derive(juniper::GraphQLInputObject, Debug, Serialize, Clone)]
pub struct ProductMultilingualInputTranslations {
    pub(in crate::commerce) locale: SupportedLocale,
    pub(in crate::commerce) name: String,
    pub(in crate::commerce) description: Option<String>,
}

#[derive(juniper::GraphQLObject, Debug, Deserialize, Clone)]
pub struct ProductMultilingualTranslations {
    pub(in crate::commerce) locale: SupportedLocale,
    pub(in crate::commerce) name: String,
    pub(in crate::commerce) description: Option<String>,
}

/// Specifies additional visibility of the product. Each product is always visible in the backoffice
/// but can additionally be displayed in POS, eshop (public) or both.
#[derive(juniper::GraphQLEnum, Copy, Clone, Serialize, Deserialize, Debug)]
pub enum ProductMultilingualInputVisibility {
    /// Visible in eshop only (therefore it's public).
    ESHOP,
    /// Visible in POS only (accessible to authorized users).
    POS,
}

#[derive(juniper::GraphQLInputObject)]
pub struct ProductMultilingualInput {
    pub(crate) images: Vec<ProductImageUploadable>,
    // unit_label: String, // TODO: always "piece" at this moment
    pub(in crate::commerce) price: ProductPriceInput,
    pub(in crate::commerce) translations: Vec<ProductMultilingualInputTranslations>,
    pub(in crate::commerce) visibility: Vec<ProductMultilingualInputVisibility>,
}

impl Default for ProductMultilingualInput {
    fn default() -> Self {
        ProductMultilingualInput {
            images: vec![],
            price: ProductPriceInput {
                unit_amount: 0,
                unit_amount_currency: SupportedCurrency::MXN,
            },
            translations: vec![ProductMultilingualInputTranslations {
                locale: SupportedLocale::EnUS,
                name: String::from("EN default name"),
                description: None,
            }],
            visibility: vec![],
        }
    }
}

#[derive(juniper::GraphQLInputObject)]
pub struct ProductPriceInput {
    /// The unit amount in centavo to be charged, represented as a whole integer.
    /// Centavo equals ¹⁄₁₀₀ of the basic monetary unit.
    pub(in crate::commerce) unit_amount: i32,

    /// Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html).
    pub(in crate::commerce) unit_amount_currency: SupportedCurrency,
}

/// # Validation rules
///
/// 1. There must be at least one translation variant available.
/// 2. Each translation variant must have a name, description is optional (enforced by the input type).
/// 3. Price cannot be bellow zero (must be positive).
fn validate_product_multilingual_input(
    product_multilingual_input: &ProductMultilingualInput,
) -> Result<(), ModelError> {
    let translations = &product_multilingual_input.translations;

    // At least one translation variant must exist:
    if translations.is_empty() {
        return Err(ModelError::LogicalError(String::from(
            "Product must have at least one translation variant.",
        )));
    }

    // Price must be higher than zero:
    if product_multilingual_input.price.unit_amount < 0 {
        return Err(ModelError::LogicalError(String::from(
            "Product price cannot be smaller than zero.",
        )));
    }

    Ok(())
}

#[derive(juniper::GraphQLEnum)]
pub enum PriceSortDirection {
    LowToHigh,
    HighToLow,
}

#[derive(juniper::GraphQLEnum, Serialize, Deserialize, Debug, Clone)]
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
    visibility: &ProductMultilingualInputVisibility,
) -> Result<Vec<Option<Product>>, ModelError> {
    // Anyone can search the products (it's not limited to admins only).
    crate::commerce::dal::products::search_products(
        &context.pool,
        &client_locale,
        &price_sort_direction,
        &search_term,
        &false, // do not search all (published only)
        &Some(*visibility),
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
                &true, // search all including unpublished ones
                &None, // no visibility restrictions
            )
            .await
        }
        _ => Err(ModelError::PermissionsError(String::from(
            "only admin can search all products",
        ))),
    }
}

pub(in crate::commerce) async fn get_published_product_by_key(
    context: &Context,
    client_locale: &SupportedLocale,
    product_key: &str,
) -> Result<Product, ModelError> {
    // Anyone can get the published product (it's not limited to admins only).
    let product = crate::commerce::dal::products::get_product_by_key(
        &context.pool,
        &client_locale,
        &product_key,
        &true, // product must be published to be publicly available
    )
    .await?;

    // Record what product user visited:
    crate::tracking::user_visited_product(&context.pool, &context.user, &product).await;

    Ok(product)
}

pub(in crate::commerce) async fn get_published_products_by_keys(
    context: &Context,
    client_locale: &SupportedLocale,
    product_keys: &[String],
) -> Result<Vec<Product>, ModelError> {
    // Anyone can get the published products (it's not limited to admins only).
    let products = crate::commerce::dal::products::get_products_by_keys(
        &context.pool,
        &client_locale,
        &product_keys,
        &true, // products must be published to be publicly available
    )
    .await?;

    Ok(products)
}

pub(in crate::commerce) async fn get_unpublished_product_by_key(
    context: &Context,
    client_locale: &SupportedLocale,
    product_key: &str,
) -> Result<Product, ModelError> {
    // Only ADMIN can do this!
    match &context.user {
        User::AdminUser(_) => {
            crate::commerce::dal::products::get_product_by_key(
                &context.pool,
                &client_locale,
                &product_key,
                &false, // any product (published or unpublished)
            )
            .await
        }
        _ => Err(ModelError::PermissionsError(String::from(
            "only admins can access unpublished products",
        ))),
    }
}

/// Takes care of the business logic and forwards the call lower to the DAL layer when everything
/// is OK. Specifically, it validates the input values to make sense and it checks permissions
/// because only admin can create a product.
pub(in crate::commerce) async fn create_product(
    context: &Context,
    product_multilingual_input: &ProductMultilingualInput,
) -> Result<Product, ModelError> {
    validate_product_multilingual_input(&product_multilingual_input)?;
    match &context.user {
        User::AdminUser(_) => {
            let mut images = vec![];
            if context.uploadables.is_some() {
                images =
                    crate::images::process_images(&context, &product_multilingual_input).await?;
            }
            crate::commerce::dal::products::create_product(
                &context.pool,
                &product_multilingual_input,
                &images,
            )
            .await
        }
        _ => Err(ModelError::PermissionsError(String::from(
            "only admins can create products",
        ))),
    }
}

pub(in crate::commerce) async fn update_product(
    context: &Context,
    product_key: &str,
    product_revision: &str,
    product_multilingual_input: &ProductMultilingualInput,
) -> Result<Product, ModelError> {
    validate_product_multilingual_input(&product_multilingual_input)?;
    match &context.user {
        User::AdminUser(_) => {
            // TODO: handle images (see `create_product`)
            crate::commerce::dal::products::update_product(
                &context.pool,
                &product_key,
                &product_revision,
                &product_multilingual_input,
                &[], // TODO
            )
            .await
        }
        _ => Err(ModelError::PermissionsError(String::from(
            "only admins can update products",
        ))),
    }
}

/// Any product can be published only when all the following requirements are met:
/// - user is an admin
/// - product has a name in EN and ES
/// - product has a description in EN and ES
/// - product price is set and above 0
/// - product has at least one picture uploaded
/// - product visibility is set to POS or ESHOP
pub(in crate::commerce) async fn publish_product(
    context: &Context,
    product_key: &str,
) -> Result<Product, ModelError> {
    match &context.user {
        User::AdminUser(_) => {
            let product = crate::commerce::dal::products::get_product_by_key(
                &context.pool,
                &SupportedLocale::EnUS,
                &product_key,
                &false, // search in all (not only the published ones)
            )
            .await?;

            if product.translations.iter().any(|t| t.description.is_none()) {
                return Err(ModelError::LogicalError(String::from(
                    "product must have description for all translation variants before publishing",
                )));
            }

            if product.price.unit_amount < 0 {
                return Err(ModelError::LogicalError(String::from(
                    "product price cannot be smaller than zero",
                )));
            }

            if product.images.is_empty() {
                return Err(ModelError::LogicalError(String::from(
                    "product must have at least one image before publishing",
                )));
            }

            if product.visibility.is_empty() {
                return Err(ModelError::LogicalError(String::from(
                    "product visibility must be defined before publishing the product",
                )));
            }

            // finally, publish the product:
            let published_product =
                crate::commerce::dal::products::publish_product(&context.pool, &product_key)
                    .await?;
            Ok(published_product)
        }
        _ => Err(ModelError::PermissionsError(String::from(
            "only admins can publish products",
        ))),
    }
}

pub(in crate::commerce) async fn unpublish_product(
    context: &Context,
    product_key: &str,
) -> Result<Product, ModelError> {
    match &context.user {
        User::AdminUser(_) => {
            // unpublish the product:
            let unpublished_product =
                crate::commerce::dal::products::unpublish_product(&context.pool, &product_key)
                    .await?;
            Ok(unpublished_product)
        }
        _ => Err(ModelError::PermissionsError(String::from(
            "only admins can unpublish products",
        ))),
    }
}

pub(in crate::commerce) async fn delete_product(
    context: &Context,
    product_key: &str,
) -> Result<Product, ModelError> {
    match &context.user {
        User::AdminUser(_) => {
            crate::commerce::dal::products::delete_product(&context.pool, &product_key).await
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
                        translations: vec![],
                        ..Default::default()
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
    async fn create_product_validation_price_below_zero_test() {
        let context = Context::create_mock();
        assert_eq!(
            format!(
                "{:?}",
                create_product(
                    &context,
                    &ProductMultilingualInput {
                        price: ProductPriceInput {
                            unit_amount: -1,
                            unit_amount_currency: SupportedCurrency::MXN
                        },
                        ..Default::default()
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
