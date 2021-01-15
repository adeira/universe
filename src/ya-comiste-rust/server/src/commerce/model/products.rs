use crate::arangodb::ConnectionPool;
use crate::auth::users::User;
use crate::commerce::model::errors::ModelError;
use crate::graphql_context::Context;
use serde::Deserialize;

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
    name: String,
    description: String,
    images: Vec<String>,
    unit_label: String,
    price: ProductPrice,
}

#[juniper::graphql_object]
impl Product {
    fn id(&self) -> juniper::ID {
        juniper::ID::from(self._id.to_owned())
    }

    /// The product’s name, meant to be displayable to the customer.
    fn name(&self) -> String {
        self.name.to_owned()
    }

    /// The product’s description, meant to be displayable to the customer. Use this field to
    /// optionally store a long form explanation of the product being sold for your own rendering
    /// purposes.
    fn description(&self) -> String {
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

#[derive(Clone, Deserialize, Debug, juniper::GraphQLObject)]
struct ProductPrice {
    /// Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in
    /// lowercase. Currently, we support only "mxn" currency.
    currency: String,

    /// The unit amount in centavo to be charged, represented as a whole integer if possible.
    /// Centavo equals ¹⁄₁₀₀ of the basic monetary unit.
    unit_amount: i32,
}

#[derive(juniper::GraphQLInputObject)]
pub struct ProductInput {
    name: String,
    description: String,
    images: Vec<String>,
    // unit_label: String, // TODO: always "piece" at this moment
    price: ProductPriceInput,
}

#[derive(juniper::GraphQLInputObject)]
pub struct ProductPriceInput {
    // currency: String, // TODO: always "mxn" at this moment
    unit_amount: i32,
}

pub(in crate::commerce) async fn create_product(
    context: &Context,
    product_input: &ProductInput,
) -> Result<Product, ModelError> {
    match &context.user {
        User::AdminUser(_) => create_product_authorized(&context.pool, &product_input).await,
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

#[derive(juniper::GraphQLEnum)]
pub enum ClientLocale {
    #[graphql(name = "en_US")]
    EnUS,
    #[graphql(name = "es_MX")]
    EsMX,
}

impl std::fmt::Display for ClientLocale {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            ClientLocale::EnUS => write!(f, "en_US"),
            ClientLocale::EsMX => write!(f, "es_MX"),
        }
    }
}

/// Performs search of products based on the specified criteria and returns products with merged
/// translations based on the eshop language. It tries to find the right translation, but if it
/// cannot, it returns the first available translation. The thinking is that we should always have
/// the correct translations available otherwise the product should not be activated.
///
/// Optionally, you can specify a search term. In this case, it performs the same search except it
/// performs additional fulltext search and additionally sorts the results by relevance. Please
/// note that we are trying to search across all available translations but still returning the
/// translated object (it might find a match in EN description but return translated description
/// in Spanish anyway - depending on the eshop language).
pub(in crate::commerce) async fn search_products(
    context: &Context,
    client_locale: &ClientLocale,
    price_sort_direction: &PriceSortDirection,
    search_term: &Option<String>,
) -> Result<Vec<Option<Product>>, ModelError> {
    let db = context.pool.db().await;
    let sort_direction = match price_sort_direction {
        PriceSortDirection::LowToHigh => "ASC",
        PriceSortDirection::HighToLow => "DESC",
    };

    let search_aql = arangors::AqlQuery::builder()
        .query(
            r#"
            FOR product IN search_products
              LIMIT 0, 24
              FILTER product.active == true
              SORT product.price.unit_amount @price_sort_direction
              LET product_with_unit_label = MERGE(product, { unit_label: DOCUMENT(product.unit_label)[@eshop_lang] } )
              LET product_translated = product_with_unit_label.translations[@eshop_lang] != null
                ? UNSET(MERGE_RECURSIVE(product_with_unit_label, product_with_unit_label.translations[@eshop_lang]), "translations")
                : UNSET(MERGE_RECURSIVE(product_with_unit_label, product_with_unit_label.translations[FIRST(ATTRIBUTES(product_with_unit_label.translations))]), "translations")
              RETURN product_translated
            "#,
        );

    // This should be almost identical with the previous one except it uses fulltext search across
    // all supported languages and it additionally sorts the results by relevance.
    let search_fulltext_aql = arangors::AqlQuery::builder()
        .query(
            r#"
            FOR supported_lang IN ["es_MX", "en_US"]
            FOR product IN search_products
              SEARCH BOOST(NGRAM_MATCH(product.translations[supported_lang].name, @search_term, 0.7, "bigram"), 1.1)
                  OR BOOST(NGRAM_MATCH(product.translations[supported_lang].description, @search_term, 0.7, "bigram"), 1.0)
              LIMIT 0, 24
              FILTER product.active == true
              SORT BM25(product) DESC
              SORT product.price.unit_amount @price_sort_direction
              LET product_with_unit_label = MERGE(product, { unit_label: DOCUMENT(product.unit_label)[@eshop_lang] } )
              LET product_translated = product_with_unit_label.translations[@eshop_lang] != null
                ? UNSET(MERGE_RECURSIVE(product_with_unit_label, product_with_unit_label.translations[@eshop_lang]), "translations")
                : UNSET(MERGE_RECURSIVE(product_with_unit_label, product_with_unit_label.translations[FIRST(ATTRIBUTES(product_with_unit_label.translations))]), "translations")
              RETURN product_translated
            "#,
        );

    let aql = match search_term {
        Some(search_term) => search_fulltext_aql
            .bind_var("search_term", search_term.clone())
            .bind_var("eshop_lang", format!("{}", client_locale))
            .bind_var("price_sort_direction", sort_direction),
        None => search_aql
            .bind_var("eshop_lang", format!("{}", client_locale))
            .bind_var("price_sort_direction", sort_direction),
    };

    let product_vector = db.aql_query::<Option<Product>>(aql.build()).await;
    match product_vector {
        Ok(product_vector) => Ok(product_vector),
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}

/// Returns a single product (or error). It tries to return the translations according to the shop
/// locale, however, it fallbacks to the first available translation if it cannot find the correct
/// translation (it should be always available though).
pub(in crate::commerce) async fn get_product(
    context: &Context,
    client_locale: &ClientLocale,
    product_id: &str,
) -> Result<Product, ModelError> {
    let db = context.pool.db().await;
    let aql = arangors::AqlQuery::builder()
        .query(
            r#"
            LET product = DOCUMENT(@product_id)
            FILTER product.active == true
            RETURN product.translations[@eshop_lang] != null
              ? UNSET(MERGE_RECURSIVE(product, product.translations[@eshop_lang]), "translations")
              : UNSET(MERGE_RECURSIVE(product, product.translations[FIRST(ATTRIBUTES(product.translations))]), "translations")
            "#,
        ).bind_var("eshop_lang", format!("{}", client_locale))
        .bind_var("product_id", product_id).build();

    let product_vector = db.aql_query::<Product>(aql).await;
    match product_vector {
        Ok(product_vector) => match product_vector.first() {
            Some(product) => Ok(product.to_owned()),
            None => Err(ModelError::LogicalError(String::from(
                "Cannot fetch the product.",
            ))),
        },
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
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
        User::AdminUser(_) => delete_product_authorized(&context.pool, &product_id).await,
        _ => Err(ModelError::PermissionsError(String::from(
            "Only admins can delete products.",
        ))),
    }
}

// TODO(004) - integration tests
async fn create_product_authorized(
    pool: &ConnectionPool,
    product_input: &ProductInput,
) -> Result<Product, ModelError> {
    let db = pool.db().await;

    // TODO: categories
    // TODO: dynamic `unit_label`

    let insert_aql = arangors::AqlQuery::builder()
        .query(
            r#"
            INSERT {
              images: @product_images,
              unit_label: "product_units/piece",
              active: false,
              created: DATE_ISO8601(DATE_NOW()),
              updated: DATE_ISO8601(DATE_NOW()),
              price: {
                currency: "mxn",
                unit_amount: @product_price_unit_amount
              },
              translations: {
                [@product_language]: {
                  name: @product_name,
                  description: @product_description,
                }
              }
            } INTO products
            LET product = NEW
            RETURN UNSET(
              MERGE_RECURSIVE(product, product.translations[@product_language]),
              "translations"
            )
            "#,
        )
        .bind_var("product_language", String::from("en_US")) // TODO
        .bind_var("product_name", product_input.name.clone())
        .bind_var("product_description", product_input.description.clone())
        .bind_var("product_images", product_input.images.clone())
        .bind_var("product_price_unit_amount", product_input.price.unit_amount)
        .build();

    let product_vector = db.aql_query::<Product>(insert_aql).await;
    println!("{:?}", product_vector);
    match product_vector {
        Ok(product_vector) => match product_vector.first() {
            Some(product) => Ok(product.to_owned()),
            None => Err(ModelError::LogicalError(String::from(
                "Cannot fetch the product.",
            ))),
        },
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}

// TODO(004) - integration tests
async fn delete_product_authorized(
    pool: &ConnectionPool,
    product_id: &str,
) -> Result<Product, ModelError> {
    let db = pool.db().await;

    let remove_aql = arangors::AqlQuery::builder()
        .query(
            r#"
            LET product = DOCUMENT(@product_id)
            REMOVE product IN products
            RETURN product.translations[@eshop_lang] != null
              ? UNSET(MERGE_RECURSIVE(product, product.translations[@eshop_lang]), "translations")
              : UNSET(MERGE_RECURSIVE(product, product.translations[FIRST(ATTRIBUTES(product.translations))]), "translations")
            "#,
        )
        .bind_var("eshop_lang", String::from("en_US")) // TODO
        .bind_var("product_id", product_id)
        .build();

    let old_product_vector = db.aql_query::<Product>(remove_aql).await;
    match old_product_vector {
        Ok(old_product_vector) => match old_product_vector.first() {
            Some(product) => Ok(product.to_owned()),
            None => Err(ModelError::LogicalError(String::from(
                "Cannot fetch deleted product.",
            ))),
        },
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}
