use crate::auth::rbac;
use crate::auth::rbac::Actions::Pos;
use crate::auth::rbac::PosActions::{Checkout, GetAllPublishedProducts, GetCheckoutStats};
use crate::commerce::api::{
    PriceSortDirection, Product, ProductMultilingualInputVisibility, SupportedCurrency,
    SupportedLocale,
};
use crate::graphql_context::Context;
use crate::pos::api::dal::{
    create_checkout, get_total_checkout_stats, PosCheckoutInput as PosCheckoutDalInput,
    PosCheckoutProductInput as PosCheckoutProductDalInput, PosCheckoutTotalStats,
};

pub(crate) struct POSQuery;
pub(crate) struct POSMutation;

mod dal;

#[juniper::graphql_object(context = Context)]
impl POSQuery {
    /// Lists published products for POS. Requires admin permissions so it should be used only in
    /// POS after logging in.
    async fn list_published_products(context: &Context) -> Option<Vec<Option<Product>>> {
        match rbac::verify_permissions(&context.user, &Pos(GetAllPublishedProducts)).await {
            Ok(_) => {
                // only admin can list the products (POS is private)
                crate::commerce::api::search_published_products(
                    &context,
                    &SupportedLocale::EnUS,         // TODO
                    &PriceSortDirection::HighToLow, // TODO
                    &None,
                    &ProductMultilingualInputVisibility::POS,
                )
                .await
            }
            Err(_) => None,
        }
    }

    async fn get_total_checkout_stats(context: &Context) -> Option<PosCheckoutTotalStats> {
        match rbac::verify_permissions(&context.user, &Pos(GetCheckoutStats)).await {
            Ok(_) => {
                // only admin can read the checkout stats
                // TODO: do not expose this directly but hide it into a model layer
                match get_total_checkout_stats(&context.pool).await {
                    Ok(total_checkout_stats) => Some(total_checkout_stats),
                    Err(_) => None, // TODO
                }
            }
            Err(_) => None, // TODO
        }
    }
}

#[derive(juniper::GraphQLObject)]
pub struct PosCheckoutPayload {
    id: juniper::ID,
}

#[derive(juniper::GraphQLObject)]
pub struct PosCheckoutError {
    message: String,
}

#[derive(juniper::GraphQLUnion)]
pub enum PosCheckoutPayloadOrError {
    Payload(PosCheckoutPayload),
    Error(PosCheckoutError),
}

#[derive(juniper::GraphQLInputObject)]
pub struct PosCheckoutProductInput {
    pub(crate) product_key: juniper::ID,
    pub(crate) product_units: i32,
    pub(crate) product_price_unit_amount: i32,
    pub(crate) product_price_unit_amount_currency: SupportedCurrency,
}

#[derive(juniper::GraphQLInputObject)]
pub struct PosCheckoutInput {
    pub(crate) selected_products: Vec<PosCheckoutProductInput>,
}

#[juniper::graphql_object(context = Context)]
impl POSMutation {
    /// This is a simplified POS checkout. We simply record what the user bought for how much and
    /// so on. There is almost no validation - what the client sends is what we record. This is the
    /// main difference from eshop checkout where we would have to verify the prices for example.
    ///
    /// Why not to verify that the checkout price matches the product price? It's because when
    /// cashier accepts the money, the product is sold for the given price and there is not time for
    /// price adjustments (customers would be angry if we would say "oh, actually it just got more
    /// expensive").
    async fn checkout(context: &Context, input: PosCheckoutInput) -> PosCheckoutPayloadOrError {
        // Contrary to what DAL requires, we accept only product keys in GraphQL and expand them on BE.

        let product_keys = input
            .selected_products
            .iter()
            .map(|product| product.product_key.to_string())
            .collect::<Vec<String>>();

        let products = crate::commerce::api::get_products_by_keys(
            &context,
            &SupportedLocale::EnUS, // TODO
            &product_keys,
        )
        .await;

        let selected_products = match products {
            Ok(products) => products
                .iter()
                .map(|product| {
                    let checkout_product = input
                        .selected_products
                        .iter()
                        .find(|p| p.product_key.to_string() == product.key())
                        .unwrap();

                    // Most of the values should be taken from the POS input except some product
                    // details which are being expanded from the product ID.
                    PosCheckoutProductDalInput {
                        product_id: product.id(),
                        product_name: product.name(),
                        product_units: checkout_product.product_units,
                        product_price_unit_amount: checkout_product.product_price_unit_amount,
                        product_price_unit_amount_currency: checkout_product
                            .product_price_unit_amount_currency,
                    }
                })
                .collect(),
            Err(e) => {
                return PosCheckoutPayloadOrError::Error(PosCheckoutError {
                    message: format!("{:?}", e),
                });
            }
        };

        match rbac::verify_permissions(&context.user, &Pos(Checkout)).await {
            Ok(_) => {
                match create_checkout(&context.pool, &PosCheckoutDalInput { selected_products })
                    .await
                {
                    Ok(checkout) => PosCheckoutPayloadOrError::Payload(PosCheckoutPayload {
                        id: juniper::ID::from(checkout.id()),
                    }),
                    Err(e) => PosCheckoutPayloadOrError::Error(PosCheckoutError {
                        message: format!("{:?}", e),
                    }),
                }
            }
            Err(_) => PosCheckoutPayloadOrError::Error(PosCheckoutError {
                message: String::from("not enough permissions to perform POS checkout"),
            }),
        }
    }
}
