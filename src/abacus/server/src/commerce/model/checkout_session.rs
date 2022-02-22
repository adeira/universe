use crate::graphql_context::Context;
use crate::locale::SupportedLocale;
use crate::price::{Price, SupportedCurrency};
use crate::stripe::{
    CheckoutSession, StripeCheckoutSessionCreateInput, StripeCheckoutSessionCreateProductInput,
};

#[derive(juniper::GraphQLInputObject, Debug, Clone)]
pub struct CheckoutSessionProductInput {
    pub(crate) product_id: juniper::ID,
    pub(crate) product_units: i32,
    pub(crate) product_price_unit_amount: i32,
    pub(crate) product_price_unit_amount_currency: SupportedCurrency,
}

#[derive(juniper::GraphQLInputObject, Debug)]
pub struct CheckoutSessionInput {
    pub(crate) selected_products: Vec<CheckoutSessionProductInput>,
}

/// This function verifies that the GraphQL input is valid (for example that the person is not
/// tampering with the prices) and calls Stripe.com API to create a new checkout session URL.
///
/// We take these two parts (ordered items + Stripe session) and save them into our database with
/// status "awaiting payment". The order should not be taken into account unless it's fully paid.
///
/// The actual payment confirmation goes through a different channel: webhooks.
///
/// ## Permissions
/// Anyone can perform the checkout (it's public) so no need to check permissions.
///
/// ## Supported payment methods
/// - Cards: https://stripe.com/docs/payments/cards/supported-card-brands
/// - TODO: OXXO
pub(crate) async fn create_checkout_session(
    context: &Context,
    input: &CheckoutSessionInput,
    client_locale: &SupportedLocale,
) -> anyhow::Result<CheckoutSession> {
    // Number of selected products cannot be higher than 100 (requirement by Stripe.com when using
    // the `payment` mode).
    let number_of_selected_products = input.selected_products.len();
    if number_of_selected_products > 100 {
        anyhow::bail!(
            "There are {} selected products but, unfortunately, maximum of 100 is allowed.",
            number_of_selected_products
        )
    }

    // Now, we have to fetch the products from our DB and run some checks to make sure
    // everything is OK:
    let selected_product_ids: Vec<String> = input
        .selected_products
        .iter()
        .map(|product| product.product_id.to_string())
        .collect();

    let db_products = crate::commerce::dal::products::get_products_by_keys_or_ids(
        &context.pool,
        client_locale,
        &selected_product_ids,
        &true, // only the published products
    )
    .await?;

    for selected_product in &input.selected_products {
        let db_product = &db_products
            .iter()
            .find(|product| product.id() == selected_product.product_id.to_string())
            .unwrap_or_else(|| {
                panic!(
                    "Product with key {} doesn't exist in the database.",
                    selected_product.product_id
                )
            });

        // Validate that the prices are still valid (or they changed in the meantime):
        if !db_product.compare_prices(Price {
            unit_amount: selected_product.product_price_unit_amount,
            unit_amount_currency: selected_product.product_price_unit_amount_currency,
        }) {
            anyhow::bail!(
                "The current product price is different and therefore the checkout could not be finished."
            )
        }

        // TODO: validate products availability (stock)
    }

    // Everything should be validated at this point so let's call Stripe.com API and get the
    // checkout session URL (basically a payment URL):
    let stripe_restricted_api_key = context.global_configuration.stripe_restricted_api_key();
    let checkout_session = crate::stripe::checkout_session_create(
        &stripe_restricted_api_key,
        &StripeCheckoutSessionCreateInput {
            selected_products: input
                .selected_products
                .iter()
                .map(|selected_product| {
                    let db_product = &db_products
                        .iter()
                        .find(|product| product.id() == selected_product.product_id.to_string())
                        .unwrap_or_else(|| {
                            panic!(
                                "Product with key {} doesn't exist in the database.",
                                selected_product.product_id
                            )
                        });

                    StripeCheckoutSessionCreateProductInput {
                        product_name: db_product.name(),
                        product_units: selected_product.product_units,
                        product_price_unit_amount: selected_product.product_price_unit_amount,
                        product_price_unit_amount_currency: selected_product
                            .product_price_unit_amount_currency,
                    }
                })
                .collect(),
        },
        client_locale,
    )
    .await?;

    // TODO: save order to the database
    // TODO: send an email (?) - maybe no and do it when the webhook arrives

    Ok(checkout_session)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn create_checkout_session_length_validation_test() {
        assert_eq!(
            create_checkout_session(
                &Context::create_mock(),
                &CheckoutSessionInput {
                    selected_products: vec![
                        CheckoutSessionProductInput {
                            product_id: juniper::ID::from(String::from("mock")),
                            product_units: 1,
                            product_price_unit_amount: 100,
                            product_price_unit_amount_currency: SupportedCurrency::MXN
                        };
                        101
                    ],
                },
                &SupportedLocale::EnUS,
            )
            .await
            .unwrap_err()
            .to_string(),
            "There are 101 selected products but, unfortunately, maximum of 100 is allowed."
        )
    }
}
