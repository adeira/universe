use crate::commerce::api::Product;
use crate::graphql::AbacusGraphQLResult;
use crate::graphql_context::Context;
use crate::locale::SupportedLocale;
use crate::menu::MenuSections;

pub(crate) struct MenuQuery;

#[juniper::graphql_object(context = Context)]
impl MenuQuery {
    /// Returns a specified section of our menu. This is to maintain one source of truth (in our
    /// database) about the prices, descriptions, translations and similar.
    async fn menu(
        context: &Context,
        client_locale: SupportedLocale,
        section: MenuSections,
    ) -> AbacusGraphQLResult<Vec<Product>> {
        Ok(crate::menu::get_section(context, &client_locale, &section).await?)
    }
}
