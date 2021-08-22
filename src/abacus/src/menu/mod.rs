use crate::commerce::api::Product;
use crate::graphql_context::Context;
use crate::locale::SupportedLocale;

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
    // TODO: improve (fetch directly from the product categories since we have them now?)
    //
    // Note: order of the products IS SIGNIFICANT.

    match section {
        MenuSections::Coffee => {
            crate::commerce::api::get_published_products_by_keys(
                context,
                client_locale,
                &[
                    "2901328".to_string(), // Espresso
                    "3626010".to_string(), // Americano
                    // "3626278".to_string(), // Long Black
                    "3633163".to_string(), // Cappuccino
                    "3633210".to_string(), // Latte
                    "3633273".to_string(), // Mocha
                    "3633334".to_string(), // Iced Latte
                ],
            )
            .await
        }
        MenuSections::Tea => {
            crate::commerce::api::get_published_products_by_keys(
                context,
                client_locale,
                &[
                    "3707024".to_string(), // Menta Amajagh
                    "3707079".to_string(), // Jasmine Mo Li Hua
                    "3707142".to_string(), // Bespoke Pu-erh Chai
                    "3707225".to_string(), // Jarabe Tapatío
                    "3707278".to_string(), // Bésame Mucho
                    "3707327".to_string(), // Maison de Cannelle
                ],
            )
            .await
        }
        MenuSections::Milkshakes => {
            crate::commerce::api::get_published_products_by_keys(
                context,
                client_locale,
                &[
                    "3763439".to_string(), // Banana milkshake
                ],
            )
            .await
        }
        MenuSections::Specialities => {
            crate::commerce::api::get_published_products_by_keys(
                context,
                client_locale,
                &[
                    "3763568".to_string(), // Matcha Latte
                    "3763681".to_string(), // Artisanal Chocolate
                ],
            )
            .await
        }
        MenuSections::DumplingSweet => {
            crate::commerce::api::get_published_products_by_keys(
                context,
                client_locale,
                &[
                    "3761831".to_string(), // Choco Salem
                    "3761904".to_string(), // Manzana Azrael
                    "3761963".to_string(), // Fresa Kitty
                    "3762026".to_string(), // Arroz Snowball
                    "3762091".to_string(), // Banana Garfield
                    "3762165".to_string(), // Lemon Figaro
                ],
            )
            .await
        }
        MenuSections::DumplingSavory => {
            crate::commerce::api::get_published_products_by_keys(
                context,
                client_locale,
                &[
                    "3762230".to_string(), // Camarón Silvestre
                    "3762295".to_string(), // Pizza Félix
                    "3762354".to_string(), // Hawaiiana Marie
                    "3762419".to_string(), // Choriqueso Demóstenes
                    "3762478".to_string(), // Tom y Jerry al pastor
                    "3763127".to_string(), // Bodoque pibil
                ],
            )
            .await
        }
    }
}
