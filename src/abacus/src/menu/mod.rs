use crate::commerce::api::{Product, SupportedLocale};
use crate::graphql_context::Context;

pub(in crate) mod api;

#[derive(juniper::GraphQLEnum)]
pub(crate) enum MenuSections {
    Coffee,
    Tea,
    Milkshakes,
    Specialities,
    DumplingSweet,
    DumplingSavory,
}

/// TODO(004) add integration tests
pub(in crate::menu) async fn get_section(
    context: &Context,
    client_locale: &SupportedLocale,
    section: &MenuSections,
) -> anyhow::Result<Vec<Product>> {
    // OK, so here is the thing: we currently do not have any way how to create a menu in Abacus.
    // Instead we are hardcoding the product IDs here. It's not perfect but it does the job. Later,
    // we should probably rethink this and do it properly.
    //
    // TODO: improve
    //
    // Note: order of the products IS SIGNIFICANT.

    match section {
        MenuSections::Coffee => {
            crate::commerce::api::get_products_by_keys(
                &context,
                &client_locale,
                &[
                    "2901328".to_string(), // Espresso
                    "3626010".to_string(), // Americano
                    "3626278".to_string(), // Long Black
                    "3633163".to_string(), // Cappuccino
                    "3633210".to_string(), // Latte
                    "3633273".to_string(), // Mocha
                    "3633334".to_string(), // Iced Latte
                ],
            )
            .await
        }
        MenuSections::Tea => {
            crate::commerce::api::get_products_by_keys(
                &context,
                &client_locale,
                &[
                    "2901328".to_string(), // TODO: comment on what is it and use real product ID
                ],
            )
            .await
        }
        MenuSections::Milkshakes => {
            crate::commerce::api::get_products_by_keys(
                &context,
                &client_locale,
                &[
                    "2901328".to_string(), // TODO: comment on what is it and use real product ID
                ],
            )
            .await
        }
        MenuSections::Specialities => {
            crate::commerce::api::get_products_by_keys(
                &context,
                &client_locale,
                &[
                    "2901328".to_string(), // TODO: comment on what is it and use real product ID
                ],
            )
            .await
        }
        MenuSections::DumplingSweet => {
            crate::commerce::api::get_products_by_keys(
                &context,
                &client_locale,
                &[
                    "2901328".to_string(), // TODO: comment on what is it and use real product ID
                ],
            )
            .await
        }
        MenuSections::DumplingSavory => {
            crate::commerce::api::get_products_by_keys(
                &context,
                &client_locale,
                &[
                    "2901328".to_string(), // TODO: comment on what is it and use real product ID
                ],
            )
            .await
        }
    }
}
