#[derive(Clone)]
pub struct AnonymousUser {
    id: String,
}

impl AnonymousUser {
    pub fn new() -> AnonymousUser {
        AnonymousUser {
            id: String::from("users/1"),
        }
    }
}

impl Default for AnonymousUser {
    fn default() -> Self {
        Self::new()
    }
}

#[derive(Clone)]
pub struct IdentifiedUser {
    id: String,
}

impl IdentifiedUser {
    pub fn new(id: String) -> IdentifiedUser {
        IdentifiedUser { id }
    }
}

#[derive(Clone)]
pub enum User {
    AnonymousUser(AnonymousUser),
    IdentifiedUser(IdentifiedUser),
}
