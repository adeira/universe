/// TODO: maybe `MobileEntrypoint` would be a better name so we are future proof?
#[derive(Clone, Debug, serde::Deserialize)]
pub struct Entrypoint {
    pub _id: String,
    pub _key: String,
}
