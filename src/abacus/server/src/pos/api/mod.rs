use crate::auth::rbac;
use crate::auth::rbac::Actions::Pos;
use crate::auth::rbac::PosActions::Checkout;
use crate::graphql_context::Context;
use crate::locale::SupportedLocale;
use crate::pos::api::dal::{
    create_checkout, PosCheckoutInput as PosCheckoutDalInput,
    PosCheckoutProductAddonInput as PosCheckoutProductAddonDalInput,
    PosCheckoutProductInput as PosCheckoutProductDalInput,
};
use crate::price::SupportedCurrency;

pub(crate) struct POSMutation;

mod dal;

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

#[derive(juniper::GraphQLInputObject, Debug)]
pub struct PosCheckoutProductAddonInput {
    pub(crate) product_addon_id: juniper::ID,
    pub(crate) product_addon_extra_price_unit_amount: i32,
    pub(crate) product_addon_extra_price_unit_amount_currency: SupportedCurrency,
}

#[derive(juniper::GraphQLInputObject, Debug)]
pub struct PosCheckoutProductInput {
    pub(crate) product_key: juniper::ID,
    pub(crate) product_units: i32,
    pub(crate) product_price_unit_amount: i32,
    pub(crate) product_price_unit_amount_currency: SupportedCurrency,
    pub(crate) product_addons: Option<Vec<PosCheckoutProductAddonInput>>,
}

#[derive(juniper::GraphQLInputObject, Debug)]
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
    async fn checkout(
        context: &Context,
        input: PosCheckoutInput,
        client_locale: SupportedLocale,
    ) -> PosCheckoutPayloadOrError {
        // Contrary to what DAL requires, we accept only product keys/IDs in GraphQL and expand them on BE.
        // TODO: move to `commerce` module

        let products = crate::commerce::api::get_published_products_by_keys(
            context,
            &client_locale,
            &input
                .selected_products
                .iter()
                .map(|product| product.product_key.to_string())
                .collect::<Vec<String>>(),
        )
        .await;

        // Let's take all products from the GraphQL input, iterate them and create a structure
        // expected by DBAL (+ add more information from our DB about the products).
        let selected_products = input
            .selected_products
            .iter()
            .map(|selected_product| {
                let product_from_db = products
                    .as_ref()
                    .unwrap()
                    .into_iter()
                    .find(|p| p.key() == selected_product.product_key.to_string())
                    .unwrap();

                PosCheckoutProductDalInput {
                    product_id: product_from_db.id(),
                    product_name: product_from_db.name(),
                    product_units: selected_product.product_units,
                    product_price_unit_amount: selected_product.product_price_unit_amount,
                    product_price_unit_amount_currency: selected_product
                        .product_price_unit_amount_currency,
                    product_addons: selected_product.product_addons.as_ref().map(|addons| {
                        addons
                            .iter()
                            .map(|addon| PosCheckoutProductAddonDalInput {
                                product_addon_id: addon.product_addon_id.to_string(),
                                product_addon_extra_price_unit_amount: addon
                                    .product_addon_extra_price_unit_amount,
                                product_addon_extra_price_unit_amount_currency: addon
                                    .product_addon_extra_price_unit_amount_currency,
                            })
                            .collect()
                    }),
                }
            })
            .collect();

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
