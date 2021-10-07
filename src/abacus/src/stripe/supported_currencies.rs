use serde::{Deserialize, Serialize};

/// Technically, there are more currencies but we support only one at the moment.
/// https://stripe.com/docs/currencies
#[derive(Copy, Clone, Debug, Deserialize, Serialize, Eq, PartialEq)]
pub enum StripeSupportedCurrency {
    #[serde(rename = "mxn")]
    Mxn,
    #[serde(rename = "usd")]
    Usd,
}
