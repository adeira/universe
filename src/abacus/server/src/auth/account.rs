use serde::Deserialize;

#[derive(Clone, Deserialize, Default)]
pub struct Account {
    pub _id: String,
    pub _key: String,
    pub _rev: String,

    is_active: bool,
}

impl Account {
    pub fn is_active(&self) -> bool {
        self.is_active
    }
}
