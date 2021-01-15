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

    let insert_aql = arangors::AqlQuery::builder()
        .query(
            r#"
            INSERT {
              name: @product_name,
              description: @product_description,
              images: @product_images,
              unit_label: "piece",
              active: true,
              created: DATE_ISO8601(DATE_NOW()),
              updated: DATE_ISO8601(DATE_NOW()),
              price: {
                currency: "mxn",
                unit_amount: @product_price_unit_amount
              }
            } INTO products
            RETURN NEW
            "#,
        )
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
            FOR product IN products
              FILTER product._id == @product_id
              REMOVE product IN products
              RETURN OLD
            "#,
        )
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
