use crate::archive::archive_struct;
use crate::auth::rbac;
use crate::auth::rbac::Actions::{Commerce, Pos};
use crate::auth::rbac::CommerceActions::{
    ArchiveProduct, CreateProduct, GetAllProducts, PublishProduct, UnpublishProduct, UpdateProduct,
};
use crate::auth::rbac::PosActions::GetAllPublishedProducts;
use crate::commerce::model::product_addons::ProductAddon;
use crate::commerce::model::product_categories::ProductCategory;
use crate::commerce::model::validations::{
    validate_product_addons, validate_product_categories, validate_product_multilingual_input,
};
use crate::graphql::AbacusGraphQLResult;
use crate::graphql_context::Context;
use crate::images::Image;
use crate::locale::SupportedLocale;
use crate::price::{Price, SupportedCurrency};
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
#[derive(Clone, Deserialize, Serialize)]
pub struct Product {
    _id: String,
    _rev: String,
    _key: String,
    /// Resolved product name (from translations based on the client locale).
    name: String,
    /// Resolved product description (from translations based on the client locale).
    description: Option<String>,
    images: Vec<Image>,
    unit_label: String,
    /// Product should not be published until it has all the translations, pictures and other
    /// requirements fulfilled.
    is_published: bool,
    visibility: Vec<ProductMultilingualInputVisibility>,
    price: Price,
    translations: Vec<ProductMultilingualTranslations>,
    addons: Option<Vec<String>>, // optional for BC (addons didn't exist at the beginning)
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

    pub(crate) fn images(&self) -> Vec<Image> {
        self.images.to_owned()
    }

    /// Returns `true` if the prices are identical otherwise `false`. It compares unit amount
    /// as well as price currency.
    pub(crate) fn compare_prices(&self, price: Price) -> bool {
        self.price.unit_amount == price.unit_amount
            && self.price.unit_amount_currency == price.unit_amount_currency
    }
}

#[juniper::graphql_object(context = Context)]
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

    fn price(&self) -> Price {
        self.price.to_owned()
    }

    fn is_published(&self) -> bool {
        self.is_published.to_owned()
    }

    fn visibility(&self) -> Vec<ProductMultilingualInputVisibility> {
        self.visibility.to_owned()
    }

    /// Same as `translations` except for one locale: it exposes the translated variant of the
    /// product with localized name, description etc.
    fn translation(&self, locale: SupportedLocale) -> Option<ProductMultilingualTranslations> {
        self.translations
            .iter()
            .cloned()
            .find(|translation| translation.locale == locale)
    }

    /// Exposes all available product translations. What is the difference between `translations`
    /// and `name`/`description`? Name and description are localized based on the eshop locale,
    /// however, translations are all the available translations ignoring the locale.
    fn translations(&self) -> Vec<ProductMultilingualTranslations> {
        self.translations.to_owned()
    }

    /// Returns ALL available product categories that can be applied to this product. You might be
    /// also interested in `selected_categories` which are categories previously selected for this
    /// product.
    async fn available_categories(
        &self,
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

    /// Returns categories that were assigned to the particular product. You might be also
    /// interested in `available_categories` which are ALL categories available for the assignment.
    async fn selected_categories(
        &self,
        context: &Context,
        client_locale: SupportedLocale,
    ) -> AbacusGraphQLResult<Vec<Option<ProductCategory>>> {
        Ok(
            crate::commerce::model::product_categories::get_assigned_product_categories(
                context,
                &client_locale,
                &self._id,
            )
            .await?,
        )
    }

    /// Returns ALL available addons that can be applied to this product. You might be also
    /// interested in `selected_addons` which are addons previously selected for this product.
    async fn available_addons(
        &self,
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

    /// Returns product addons that were assigned to the particular product. You might be also
    /// interested in `available_addons` which are ALL addons available for the assignment.
    async fn selected_addons(
        &self,
        context: &Context,
        client_locale: SupportedLocale,
    ) -> AbacusGraphQLResult<Vec<Option<ProductAddon>>> {
        if let Some(addons) = &self.addons {
            Ok(
                crate::commerce::model::product_addons::get_product_addons_by_ids(
                    context,
                    &client_locale,
                    addons,
                )
                .await?,
            )
        } else {
            Ok(vec![])
        }
    }

    /// Returns true when the product has some assigned addons, otherwise false.
    async fn has_selected_addons(&self) -> AbacusGraphQLResult<bool> {
        if let Some(addons) = &self.addons {
            Ok(!addons.is_empty())
        } else {
            Ok(false)
        }
    }
}

/// This type should be used together with GraphQL uploads and it should hold the file names being
/// uploaded. It's used together with the actual uploaded files for validation purposes. Only files
/// which are defined using this scalar will be processed.
#[derive(juniper::GraphQLScalarValue, Clone, Serialize, Deserialize, Debug)]
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

#[derive(juniper::GraphQLObject, Debug, Deserialize, Clone, Serialize)]
pub struct ProductMultilingualTranslations {
    pub(in crate::commerce) locale: SupportedLocale,
    pub(in crate::commerce) name: String,
    pub(in crate::commerce) description: Option<String>,
}

/// Specifies additional visibility of the product. Each product is always visible in the backoffice
/// but can additionally be displayed in POS, eshop (public) or both.
#[allow(clippy::upper_case_acronyms)]
#[derive(juniper::GraphQLEnum, Copy, Clone, Serialize, Deserialize, Debug)]
pub enum ProductMultilingualInputVisibility {
    /// Visible in eshop only (therefore it's public).
    ESHOP, // TODO: rename to generic `COMMERCE` (?)
    /// Visible in POS only (accessible to authorized users).
    POS,
}

#[derive(juniper::GraphQLInputObject, Debug)]
pub struct ProductMultilingualInput {
    pub(crate) images: Vec<ProductImageUploadable>,
    pub(in crate::commerce) price: ProductPriceInput,
    pub(in crate::commerce) translations: Vec<ProductMultilingualInputTranslations>,
    pub(in crate::commerce) visibility: Vec<ProductMultilingualInputVisibility>,
    pub(in crate::commerce) categories: Vec<juniper::ID>,
    pub(in crate::commerce) addons: Vec<juniper::ID>,
}

impl ProductMultilingualInput {
    pub(in crate::commerce) fn visibility(&self) -> &Vec<ProductMultilingualInputVisibility> {
        &self.visibility
    }

    pub(in crate::commerce) fn categories(&self) -> Vec<String> {
        self.categories.iter().map(|id| id.to_string()).collect()
    }

    pub(in crate::commerce) fn addons(&self) -> Vec<String> {
        self.addons.iter().map(|id| id.to_string()).collect()
    }
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
            categories: vec![],
            addons: vec![],
        }
    }
}

#[derive(juniper::GraphQLInputObject, Debug)]
pub struct ProductPriceInput {
    /// The unit amount in centavo to be charged, represented as a whole integer.
    /// Centavo equals ¹⁄₁₀₀ of the basic monetary unit.
    pub(in crate::commerce) unit_amount: i32,

    /// Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html).
    pub(in crate::commerce) unit_amount_currency: SupportedCurrency,
}

#[derive(juniper::GraphQLEnum)]
pub enum PriceSortDirection {
    LowToHigh,
    HighToLow,
}

/// Returns ALL products (published and unpublished) without any visibility restrictions.
pub(in crate::commerce) async fn search_all_products(
    context: &Context,
    client_locale: &SupportedLocale,
    price_sort_direction: &PriceSortDirection,
) -> anyhow::Result<Vec<Option<Product>>> {
    rbac::verify_permissions(&context.user, &Commerce(GetAllProducts)).await?;
    crate::commerce::dal::products::search_products(
        &context.pool,
        client_locale,
        price_sort_direction,
        &true, // search all including unpublished ones
        &None, // no visibility restrictions
    )
    .await
}

/// Returns ALL products (published and unpublished) without any visibility restrictions in selected
/// categories.
pub(in crate::commerce) async fn search_all_products_in_categories(
    context: &Context,
    client_locale: &SupportedLocale,
    price_sort_direction: &PriceSortDirection,
    categories: &[juniper::ID],
) -> anyhow::Result<Vec<Option<Product>>> {
    rbac::verify_permissions(&context.user, &Commerce(GetAllProducts)).await?;
    validate_product_categories(
        context,
        client_locale,
        &categories.iter().map(|id| id.to_string()).collect(),
    )
    .await?;
    crate::commerce::dal::products::search_products_in_categories(
        &context.pool,
        client_locale,
        price_sort_direction,
        categories,
        &true, // search all including unpublished ones
        &None, // no visibility restrictions
    )
    .await
}

/// Returns all published products based on the specified visibility.
pub(in crate::commerce) async fn search_all_published_products(
    context: &Context,
    client_locale: &SupportedLocale,
    price_sort_direction: &PriceSortDirection,
    visibility: &ProductMultilingualInputVisibility,
) -> anyhow::Result<Vec<Option<Product>>> {
    match visibility {
        ProductMultilingualInputVisibility::POS => {
            rbac::verify_permissions(&context.user, &Pos(GetAllPublishedProducts)).await?;
        }
        ProductMultilingualInputVisibility::ESHOP => {
            // public
        }
    }

    crate::commerce::dal::products::search_products(
        &context.pool,
        client_locale,
        price_sort_direction,
        &false, // do not search all (published only)
        &Some(*visibility),
    )
    .await
}

/// Returns all published products based on the specified visibility in the specified categories.
pub(in crate::commerce) async fn search_all_published_products_in_categories(
    context: &Context,
    client_locale: &SupportedLocale,
    price_sort_direction: &PriceSortDirection,
    categories: &[juniper::ID],
    visibility: &ProductMultilingualInputVisibility,
) -> anyhow::Result<Vec<Option<Product>>> {
    // TODO: DRY with `search_all_published_products`
    match visibility {
        ProductMultilingualInputVisibility::POS => {
            rbac::verify_permissions(&context.user, &Pos(GetAllPublishedProducts)).await?;
        }
        ProductMultilingualInputVisibility::ESHOP => {
            // public
        }
    }

    validate_product_categories(
        context,
        client_locale,
        &categories.iter().map(|id| id.to_string()).collect(),
    )
    .await?;

    crate::commerce::dal::products::search_products_in_categories(
        &context.pool,
        client_locale,
        price_sort_direction,
        categories,
        &false, // do not search all (published only)
        &Some(*visibility),
    )
    .await
}

pub(in crate::commerce) async fn get_published_product_by_key(
    context: &Context,
    client_locale: &SupportedLocale,
    product_key: &str,
) -> anyhow::Result<Product> {
    // Anyone can get the published product (it's not limited to admins only).
    let product = crate::commerce::dal::products::get_product_by_key_or_id(
        &context.pool,
        client_locale,
        product_key,
        &true, // product must be published to be publicly available
    )
    .await?;

    Ok(product)
}

pub(in crate::commerce) async fn get_published_products_by_keys(
    context: &Context,
    client_locale: &SupportedLocale,
    product_keys: &[String],
) -> anyhow::Result<Vec<Product>> {
    // Anyone can get the published products (it's not limited to admins only).
    crate::commerce::dal::products::get_products_by_keys_or_ids(
        &context.pool,
        client_locale,
        product_keys,
        &true, // products must be published to be publicly available
    )
    .await
}

pub(in crate::commerce) async fn get_unpublished_product_by_key(
    context: &Context,
    client_locale: &SupportedLocale,
    product_key: &str,
) -> anyhow::Result<Product> {
    rbac::verify_permissions(&context.user, &Commerce(GetAllProducts)).await?;

    crate::commerce::dal::products::get_product_by_key_or_id(
        &context.pool,
        client_locale,
        product_key,
        &false, // any product (published or unpublished)
    )
    .await
}

/// Takes care of the business logic and forwards the call lower to the DAL layer when everything
/// is OK. Specifically, it validates the input values to make sense and it checks permissions
/// because only admin can create a product.
pub(in crate::commerce) async fn create_product(
    context: &Context,
    client_locale: &SupportedLocale,
    product_multilingual_input: &ProductMultilingualInput,
) -> anyhow::Result<Product> {
    rbac::verify_permissions(&context.user, &Commerce(CreateProduct)).await?;

    validate_product_multilingual_input(product_multilingual_input)?;
    validate_product_categories(
        context,
        client_locale,
        &product_multilingual_input.categories(),
    )
    .await?;
    validate_product_addons(context, client_locale, &product_multilingual_input.addons()).await?;

    // First, we process the product images.
    let mut images = vec![];
    if context.uploadables.is_some() {
        images = crate::images::process_new_images(context, product_multilingual_input).await?;
    }

    // Then, we create the product with the previously created images (and assigned addons).
    let created_product = crate::commerce::dal::products::create_product(
        &context.pool,
        client_locale,
        product_multilingual_input,
        &images,
    )
    .await?;

    // And finally, we assign product categories.
    crate::commerce::dal::product_categories::assign_product_categories(
        &context.pool,
        &created_product.id(),
        &product_multilingual_input.categories(),
        client_locale,
    )
    .await?;

    Ok(created_product)
}

pub(in crate::commerce) async fn update_product(
    context: &Context,
    client_locale: &SupportedLocale,
    product_key: &str,
    product_revision: &str,
    product_multilingual_input: &ProductMultilingualInput,
) -> anyhow::Result<Product> {
    rbac::verify_permissions(&context.user, &Commerce(UpdateProduct)).await?;

    validate_product_multilingual_input(product_multilingual_input)?;
    validate_product_categories(
        context,
        client_locale,
        &product_multilingual_input.categories(),
    )
    .await?;
    validate_product_addons(context, client_locale, &product_multilingual_input.addons()).await?;

    let product = crate::commerce::dal::products::get_product_by_key_or_id(
        &context.pool,
        client_locale,
        product_key,
        &false, // both published and unpublished
    )
    .await?;

    // collect newly uploaded images
    let mut new_images = vec![];
    if context.uploadables.is_some() {
        new_images =
            crate::images::process_updated_images(context, product_multilingual_input).await?;
    }

    // delete old images
    let mut existing_images = vec![];
    for product_image in product.images() {
        match product_multilingual_input
            .images
            .iter()
            .find(|image| image.to_string() == product_image.name())
        {
            Some(_) => {
                // the image should be preserved (it's not requested to be deleted)
                existing_images.push(product_image);
            }
            None => {
                // `product_image` no longer exists in the input so we should delete it
                crate::images::delete_image(context, &product_image).await?;
            }
        }
    }

    // merge new (uploaded) images with the preserved images
    existing_images.extend(new_images);

    // update the product (and assigned addons)
    let updated_product = crate::commerce::dal::products::update_product(
        &context.pool,
        client_locale,
        product_key,
        product_revision,
        product_multilingual_input,
        &existing_images,
    )
    .await?;

    // and finally, assign the new product categories
    crate::commerce::dal::product_categories::assign_product_categories(
        &context.pool,
        &updated_product.id(),
        &product_multilingual_input.categories(),
        client_locale,
    )
    .await?;

    Ok(updated_product)
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
    client_locale: &SupportedLocale,
) -> anyhow::Result<Product> {
    rbac::verify_permissions(&context.user, &Commerce(PublishProduct)).await?;

    let product = crate::commerce::dal::products::get_product_by_key_or_id(
        &context.pool,
        &SupportedLocale::EnUS,
        product_key,
        &false, // search in all (not only the published ones)
    )
    .await?;

    if product.translations.iter().any(|t| t.description.is_none()) {
        anyhow::bail!(
            "product must have description for all translation variants before publishing"
        )
    }

    if product.price.unit_amount < 0 {
        anyhow::bail!("product price cannot be smaller than zero")
    }

    if product.images.is_empty() {
        anyhow::bail!("product must have at least one image before publishing")
    }

    if product.visibility.is_empty() {
        anyhow::bail!("product visibility must be defined before publishing the product")
    }

    // finally, publish the product:
    crate::commerce::dal::products::publish_product(&context.pool, product_key, client_locale).await
}

pub(in crate::commerce) async fn unpublish_product(
    context: &Context,
    product_key: &str,
    client_locale: &SupportedLocale,
) -> anyhow::Result<Product> {
    rbac::verify_permissions(&context.user, &Commerce(UnpublishProduct)).await?;

    // unpublish the product:
    crate::commerce::dal::products::unpublish_product(&context.pool, product_key, client_locale)
        .await
}

/// We need to perform the following steps when archiving the product:
///
/// 1. retrieve it in a complete form from DB
/// 2. save copy of this data to the archive
/// 3. remove all related pictures from S3
/// 4. delete the actual product (only after it's been copied to the archive!)
///
/// TODO: it would be a good idea to call this in a DB transaction
pub(in crate::commerce) async fn archive_product(
    context: &Context,
    product_key: &str,
    client_locale: &SupportedLocale,
) -> anyhow::Result<Product> {
    rbac::verify_permissions(&context.user, &Commerce(ArchiveProduct)).await?;

    // 1. get the old product
    let product_old = crate::commerce::dal::products::get_product_by_key_or_id(
        &context.pool,
        client_locale,
        product_key,
        &false, // both published and unpublished
    )
    .await?;

    // 2. archive it
    archive_struct(&context.pool, &product_old._id, "products", &product_old).await?;

    // 3. delete all related pictures
    for image in product_old.images() {
        crate::images::delete_image(context, &image).await?;
    }

    // 4. hard delete the product
    crate::commerce::dal::products::delete_product(&context.pool, product_key, client_locale).await
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn create_product_unauthorized_test() {
        let context = Context::create_mock();
        assert_eq!(
            format!(
                "{:?}",
                create_product(
                    &context,
                    &SupportedLocale::EnUS,
                    &ProductMultilingualInput {
                        ..Default::default()
                    }
                )
                .await
                .err()
                .unwrap()
            ),
            "user is not logged in (anonymous)"
        );
    }

    #[tokio::test]
    async fn update_product_unauthorized_test() {
        let context = Context::create_mock();
        assert_eq!(
            format!(
                "{:?}",
                update_product(
                    &context,
                    &SupportedLocale::EnUS,
                    "product_key_mock",
                    "product_revision_mock",
                    &ProductMultilingualInput {
                        ..Default::default()
                    }
                )
                .await
                .err()
                .unwrap()
            ),
            "user is not logged in (anonymous)"
        );
    }
}
