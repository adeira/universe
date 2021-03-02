use serde::Deserialize;

/// Anonymous user represents an unknown/unauthorized user. It's a specific case of a user which
/// actually exists in our database and it used for returning data for "any viewer" like if they
/// were not logged in. In other words: every user is kinda logged-in anonymously.
#[derive(Clone, Deserialize)]
pub struct AnonymousUser {
    id: String,
}

impl Default for AnonymousUser {
    fn default() -> Self {
        Self::new()
    }
}

impl AnonymousUser {
    pub(crate) fn new() -> AnonymousUser {
        AnonymousUser {
            id: String::from("users/1"), // hardcoded DB value (should always exist!)
        }
    }

    pub(crate) fn id(&self) -> String {
        self.id.to_owned()
    }
}
