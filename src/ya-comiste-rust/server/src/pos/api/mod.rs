use crate::auth::users::User;
use crate::commerce::api::{
    PriceSortDirection, Product, ProductMultilingualInputVisibility, SupportedLocale,
};
use crate::graphql_context::Context;

pub(crate) struct POS;

#[juniper::graphql_object(context = Context)]
impl POS {
    /// Lists published products for POS. Requires admin permissions so it should be used only in
    /// POS after logging in.
    async fn list_published_products(context: &Context) -> Option<Vec<Option<Product>>> {
        match context.user {
            User::AdminUser(_) => crate::pos::api::list_published_products(context).await,
            _ => None,
        }
    }
}

pub(in crate::pos) async fn list_published_products(
    context: &Context,
) -> Option<Vec<Option<Product>>> {
    // TODO: search only products which should be displayed in POS (not the whole store)

    crate::commerce::api::search_published_products(
        &context,
        &SupportedLocale::EnUS,         // TODO
        &PriceSortDirection::HighToLow, // TODO
        &None,
        &ProductMultilingualInputVisibility::POS,
    )
    .await
}
