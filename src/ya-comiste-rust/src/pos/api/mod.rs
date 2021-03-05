use crate::auth::users::User;
use crate::commerce::api::{
    PriceSortDirection, Product, ProductMultilingualInputVisibility, SupportedLocale,
};
use crate::graphql_context::Context;
use crate::pos::api::dal::create_checkout;

pub(crate) struct POSQuery;
pub(crate) struct POSMutation;

mod dal;

#[juniper::graphql_object(context = Context)]
impl POSQuery {
    /// Lists published products for POS. Requires admin permissions so it should be used only in
    /// POS after logging in.
    async fn list_published_products(context: &Context) -> Option<Vec<Option<Product>>> {
        match context.user {
            User::AdminUser(_) => {
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
            _ => None,
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
    async fn checkout(context: &Context) -> PosCheckoutPayloadOrError {
        match context.user {
            User::AdminUser(_) => match create_checkout(&context.pool).await {
                Ok(checkout) => PosCheckoutPayloadOrError::Payload(PosCheckoutPayload {
                    id: juniper::ID::from(checkout.id()),
                }),
                Err(e) => PosCheckoutPayloadOrError::Error(PosCheckoutError {
                    message: format!("{:?}", e),
                }),
            },
            _ => PosCheckoutPayloadOrError::Error(PosCheckoutError {
                message: String::from("only admin can perform POS checkout"),
            }),
        }
    }
}
