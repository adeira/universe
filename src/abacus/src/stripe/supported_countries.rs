use serde::{Deserialize, Serialize};

/// Obviously, there are more allowed countries but since we do not support other ones then there
/// is no point in adding them to the list.
#[derive(Clone, Debug, Deserialize, Serialize)]
pub enum StripeSupportedCountries {
    #[serde(rename = "MX")]
    Mx,
}
