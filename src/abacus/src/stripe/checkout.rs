use crate::stripe::supported_countries::StripeSupportedCountries;
use crate::stripe::supported_currencies::StripeSupportedCurrency;
use crate::stripe::supported_locales::StripeSupportedLocales;
use serde::{Deserialize, Serialize};

/// Technically, there are other checkout modes but we support only "payment".
#[derive(Copy, Clone, Debug, Deserialize, Serialize, Eq, PartialEq)]
pub enum CheckoutSessionMode {
    // Accept one-time payments for cards, iDEAL, and more.
    #[serde(rename = "payment")]
    Payment,
}

/// Technically, there are other checkout methof types but we support only "card" at the moment.
/// TODO: OXXO
#[derive(Clone, Debug, Deserialize, Serialize)]
pub enum CheckoutSessionPaymentMethodTypes {
    #[serde(rename = "card")]
    Card,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub enum CheckoutSessionPaymentStatus {
    #[serde(rename = "paid")]
    Paid,
    #[serde(rename = "unpaid")]
    Unpaid,
    #[serde(rename = "no_payment_required")]
    NoPaymentRequired,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct CheckoutSessionShippingAddressCollection {
    pub allowed_countries: Vec<StripeSupportedCountries>,
}

#[derive(Clone, Debug, Deserialize, Serialize, Default)]
pub struct ProductData {
    pub name: String,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PriceData {
    pub currency: StripeSupportedCurrency,
    pub product_data: ProductData,
    pub unit_amount: i32,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct CheckoutSessionItem {
    pub price_data: PriceData,

    /// The quantity of products being purchased.
    pub quantity: i32,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct CheckoutSession {
    /// Unique identifier for the checkout session.
    /// Example: "cs_test_..."
    #[serde(skip_serializing_if = "Option::is_none")]
    pub id: Option<String>,

    /// Total of all items AFTER discounts and taxes are applied.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub amount_total: Option<i32>,

    /// Total of all items BEFORE discounts or taxes are applied.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub amount_subtotal: Option<i32>,

    /// Three-letter ISO currency code, in lowercase.
    /// Must be a [supported currency](https://stripe.com/docs/currencies).
    #[serde(skip_serializing_if = "Option::is_none")]
    pub currency: Option<StripeSupportedCurrency>,

    /// The URL to which Stripe should send customers when payment or setup is complete.
    /// Example: "https://example.com/success"
    pub success_url: String,

    /// The URL the customer will be directed to if they decide to cancel payment and return to your
    /// website.
    /// Example: "https://example.com/cancel"
    pub cancel_url: String,

    /// The mode of the Checkout Session, one of `payment`, `setup`, or `subscription`.
    pub mode: CheckoutSessionMode,

    /// A list of the types of payment methods (e.g., `card`) this Checkout Session can accept.
    ///
    /// If multiple payment methods are passed, Checkout will dynamically reorder them to prioritize
    /// the most relevant payment methods based on the customer’s location and other characteristics.
    ///
    /// See: https://stripe.com/docs/payments/payment-methods/overview
    pub payment_method_types: Vec<CheckoutSessionPaymentMethodTypes>,

    /// The payment status of the Checkout Session, one of `paid`, `unpaid`, or `no_payment_required`.
    /// You can use this value to decide when to fulfill your customer's order.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub payment_status: Option<CheckoutSessionPaymentStatus>,

    /// A list of items the customer is purchasing.
    ///
    /// For `payment` mode, there is a maximum of 100 line items, however it is recommended to
    /// consolidate line items if there are more than a few dozen.
    ///
    /// This field is not included by default. To include it in the response,
    /// [expand](https://stripe.com/docs/api/expanding_objects) the `line_items` field.
    pub line_items: Option<Vec<CheckoutSessionItem>>,

    /// The IETF language tag of the locale Checkout is displayed in. If blank or `auto`, the
    /// browser's locale is used.
    pub locale: StripeSupportedLocales,

    /// The shipping rate to apply to this Session. Currently, only up to one may be specified.
    pub shipping_rates: Option<Vec<String>>,

    /// When set, provides configuration for Checkout to collect a shipping address from a customer.
    pub shipping_address_collection: CheckoutSessionShippingAddressCollection,

    /// The URL to the Checkout Session.
    /// Example: "https://checkout.stripe.com/pay/cs_test_..."
    #[serde(skip_serializing_if = "Option::is_none")]
    pub url: Option<String>,
}

impl Default for CheckoutSession {
    fn default() -> Self {
        CheckoutSession {
            id: None,
            amount_total: None,
            amount_subtotal: None,
            currency: None,
            success_url: "".to_string(),
            cancel_url: "".to_string(),
            mode: CheckoutSessionMode::Payment,
            payment_method_types: vec![],
            payment_status: None,
            line_items: None,
            locale: StripeSupportedLocales::Auto,
            shipping_rates: None,
            shipping_address_collection: CheckoutSessionShippingAddressCollection {
                allowed_countries: vec![],
            },
            url: None,
        }
    }
}

#[juniper::graphql_object]
impl CheckoutSession {
    fn id(&self) -> juniper::ID {
        match &self.id {
            Some(id) => juniper::ID::from(id.to_owned()),
            None => juniper::ID::from(String::from("")), // this should never happen though
        }
    }

    /// The URL to the Checkout Session. Users should be redirected here so they can pay the order.
    fn payment_url(&self) -> Option<String> {
        self.url.to_owned()
    }
}
