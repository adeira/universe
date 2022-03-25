use crate::commerce::api::Product;
use crate::graphql_context::Context;
use crate::locale::SupportedLocale;

pub(in crate) mod api;

#[derive(juniper::GraphQLEnum)]
pub(crate) enum MenuSections {
    Coffee,
    Tea,
    Specialities,
    Others,
    Kochkadas,
    Ciabattas,
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
    // TODO: alternatively, fetch from the DB
    //
    // Note: order of the products IS SIGNIFICANT.

    match section {
        MenuSections::Coffee => {
            crate::commerce::api::get_published_products_by_keys(
                context,
                client_locale,
                &[
                    "2901328".to_string(),  // Espresso
                    "3626010".to_string(),  // Espresso Americano
                    "14944417".to_string(), // Espresso Tonic
                    "16896647".to_string(), // Flat white
                    "3633163".to_string(),  // Cappuccino
                    "3633210".to_string(),  // Caffe Latte
                    "3633334".to_string(),  // Iced Caffe Latte
                ],
            )
            .await
        }
        MenuSections::Tea => {
            crate::commerce::api::get_published_products_by_keys(
                context,
                client_locale,
                &[
                    "3707024".to_string(),  // Menta Amajagh
                    "3707079".to_string(),  // Jasmine Mo Li Hua
                    "3707142".to_string(),  // Bespoke Pu-erh Chai
                    "13296916".to_string(), // Hamara Black Chai
                    "3707225".to_string(),  // Jarabe Tapatío
                    "3707278".to_string(),  // Bésame Mucho
                ],
            )
            .await
        }
        MenuSections::Specialities => {
            crate::commerce::api::get_published_products_by_keys(
                context,
                client_locale,
                &[
                    "3633273".to_string(),  // Mocha
                    "13116127".to_string(), // Chai Latte
                    "3763568".to_string(),  // Matcha Latte
                    "3763681".to_string(),  // Artisanal Chocolate
                ],
            )
            .await
        }
        MenuSections::Others => {
            crate::commerce::api::get_published_products_by_keys(
                context,
                client_locale,
                &[
                    "16912805".to_string(), // Naranjada
                    "3763439".to_string(),  // Banana milkshake
                    "11812843".to_string(), // Strawberry milkshake
                ],
            )
            .await
        }
        MenuSections::Kochkadas => {
            crate::commerce::api::get_published_products_by_keys(
                context,
                client_locale,
                &[
                    "3761831".to_string(), // Choco Salem
                    "3761904".to_string(), // Manzana Azrael
                    "3761963".to_string(), // Fresa Kitty
                    "3762026".to_string(), // Arroz Snowball
                    "3762091".to_string(), // Banana Garfield
                    "3762295".to_string(), // Pizza Félix
                    "3763127".to_string(), // Bodoque bolognese
                ],
            )
            .await
        }
        MenuSections::Ciabattas => {
            crate::commerce::api::get_published_products_by_keys(
                context,
                client_locale,
                &[
                    "15687297".to_string(), // Ciabatta smoked turkey breast
                    "15687748".to_string(), // Salami ciabatta
                    "15687968".to_string(), // Ciabatta with caramelized apple
                ],
            )
            .await
        }
    }
}
