use crate::auth::users::User;
use crate::commerce::api::{ClientLocale, PriceSortDirection, Product};
use crate::graphql_context::Context;

pub(crate) struct POS;

#[juniper::graphql_object(context = Context)]
impl POS {
    async fn list_products(context: &Context) -> Option<Vec<Option<Product>>> {
        match context.user {
            User::AdminUser(_) => crate::pos::api::list_products(context).await,
            _ => None,
        }
    }
}

pub(in crate::pos) async fn list_products(context: &Context) -> Option<Vec<Option<Product>>> {
    // TODO: search only products which should be displayed in POS (not the whole store)

    crate::commerce::api::search_products(
        &context,
        &ClientLocale::EnUS,            // TODO
        &PriceSortDirection::HighToLow, // TODO
        &None,
    )
    .await
}
