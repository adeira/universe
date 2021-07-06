use serde::{Deserialize, Serialize};

#[allow(clippy::upper_case_acronyms)]
#[derive(juniper::GraphQLEnum, Clone, Serialize, Deserialize, Debug, Copy)]
pub(in crate) enum SupportedCurrency {
    MXN,
}

#[derive(juniper::GraphQLObject, Clone, Deserialize, Debug)]
pub(in crate) struct Price {
    /// The unit amount in centavo to be charged, represented as a whole integer.
    /// Centavo equals ¹⁄₁₀₀ of the basic monetary unit.
    pub(in crate) unit_amount: i32,

    /// Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html).
    pub(in crate) unit_amount_currency: SupportedCurrency,
}
