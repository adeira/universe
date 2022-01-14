use serde::{Deserialize, Serialize};

/// Additional locales are available, however, we support only English and Spanish at this moment.
/// See: https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-locale
#[derive(Clone, Debug, Deserialize, Serialize)]
pub enum StripeSupportedLocales {
    #[serde(rename = "auto")]
    Auto,
    #[serde(rename = "en")]
    En,
    #[serde(rename = "es-419")]
    Es,
}
