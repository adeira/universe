use crate::locale::SupportedLocale;
use crate::price::SupportedCurrency;
pub use crate::stripe::checkout::CheckoutSession;
use crate::stripe::checkout::{
    CheckoutSessionItem, CheckoutSessionMode, CheckoutSessionPaymentMethodTypes,
    CheckoutSessionShippingAddressCollection, PriceData, ProductData,
};
use crate::stripe::supported_countries::StripeSupportedCountries;
use crate::stripe::supported_currencies::StripeSupportedCurrency;
use crate::stripe::supported_locales::StripeSupportedLocales;
use reqwest::{header, Client};

mod checkout;
mod supported_countries;
mod supported_currencies;
mod supported_locales;

pub mod webhook;

#[derive(Debug, Clone)]
pub struct StripeCheckoutSessionCreateProductInput {
    pub(crate) product_name: String,
    pub(crate) product_units: i32,
    pub(crate) product_price_unit_amount: i32,
    pub(crate) product_price_unit_amount_currency: SupportedCurrency,
}

#[derive(Debug)]
pub struct StripeCheckoutSessionCreateInput {
    pub(crate) selected_products: Vec<StripeCheckoutSessionCreateProductInput>,
}

/// See: https://stripe.com/docs/api/checkout/sessions/create
pub(crate) async fn checkout_session_create(
    stripe_restricted_api_key: &str,
    input: &StripeCheckoutSessionCreateInput,
    client_locale: &SupportedLocale,
) -> anyhow::Result<CheckoutSession> {
    let form = CheckoutSession {
        success_url: String::from("https://kochka.com.mx/shop/checkout/success"), // TODO
        cancel_url: String::from("https://kochka.com.mx/shop/checkout/cancel"),   // TODO
        mode: CheckoutSessionMode::Payment,
        payment_method_types: vec![CheckoutSessionPaymentMethodTypes::Card],
        line_items: Some(
            input
                .selected_products
                .iter()
                .map(|selected_product| {
                    CheckoutSessionItem {
                        price_data: PriceData {
                            currency: match &selected_product.product_price_unit_amount_currency {
                                // TODO: eventually extract to "convert abacus currency to stripe currency"
                                SupportedCurrency::MXN => StripeSupportedCurrency::Mxn,
                            },
                            product_data: ProductData {
                                name: selected_product.product_name.to_owned(),
                            },
                            unit_amount: selected_product.product_price_unit_amount,
                        },
                        quantity: selected_product.product_units,
                    }
                })
                .collect(),
        ),
        locale: Some(match client_locale {
            // TODO: eventually extract to "convert abacus locale to stripe locale"
            SupportedLocale::EnUS => StripeSupportedLocales::En,
            SupportedLocale::EsMX => StripeSupportedLocales::Es,
        }),
        shipping_rates: Some(vec![
            // Seems like shipping rates are currently not publicly available via API so we have
            // to hardcode here the shipping rate ID. Additionally, only one shipping rate can be
            // specified here. See: https://stripe.com/docs/payments/checkout/shipping
            String::from("shr_1Jhlo8IHqwQFdWEmCnHvCz1m"),
        ]),
        shipping_address_collection: Some(CheckoutSessionShippingAddressCollection {
            allowed_countries: vec![StripeSupportedCountries::Mx],
        }),
        ..Default::default()
    };

    let client = create_stripe_api_client(stripe_restricted_api_key)?;
    let resp = client
        .post("https://api.stripe.com/v1/checkout/sessions")
        .body(serde_qs::to_string(&form)?)
        .send()
        .await?;

    match resp.error_for_status() {
        Ok(resp) => {
            let json: CheckoutSession = resp.json().await?;
            dbg!(&json);
            Ok(json)
        }
        Err(error) => {
            anyhow::bail!(error)
        }
    }
}

fn create_stripe_api_client(stripe_restricted_api_key: &str) -> anyhow::Result<Client> {
    let mut headers = header::HeaderMap::new();

    // https://stripe.com/docs/api/versioning
    headers.insert(
        "Stripe-Version",
        header::HeaderValue::from_static("2020-08-27"),
    );

    // https://stripe.com/docs/api/authentication
    let mut auth_value =
        header::HeaderValue::from_str(format!("Bearer {}", stripe_restricted_api_key).as_str())
            .unwrap(); // we assume `from_str` wont fail since we have the API key value under control

    auth_value.set_sensitive(true);
    headers.insert(header::AUTHORIZATION, auth_value);

    // All stripe calls must be `application/x-www-form-urlencoded`:
    headers.insert(
        header::CONTENT_TYPE,
        header::HeaderValue::from_static("application/x-www-form-urlencoded"),
    );

    Ok(reqwest::Client::builder()
        .default_headers(headers)
        .build()?)
}
