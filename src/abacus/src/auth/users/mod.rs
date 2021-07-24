pub use crate::auth::users::anonymous_user::AnonymousUser;
pub use crate::auth::users::signed_user::SignedUser;

use crate::auth::google::Claims;
use serde::{Deserialize, Serialize};

mod anonymous_user;
mod signed_user;

#[allow(clippy::large_enum_variant)]
#[derive(Clone, Deserialize)]
pub enum User {
    AnonymousUser(AnonymousUser),
    SignedUser(SignedUser),
}

/// AnyUser represents any generic user in the database which can later be converted to the right
/// type (admin/anonymous/authorized) as needed.
#[derive(Clone, Deserialize, Serialize)]
pub struct AnyUser {
    _id: String,
    _rev: String,
    _key: String,
    is_active: bool,
    google: Option<Claims>,
}

#[juniper::graphql_object]
impl AnyUser {
    pub(crate) fn id(&self) -> String {
        self._id.to_owned()
    }

    pub(crate) fn is_active(&self) -> bool {
        self.is_active.to_owned()
    }

    /// Name is a full name of the user ("John Doe").
    pub(crate) fn name(&self) -> Option<String> {
        match &self.google {
            Some(google) => google.name().to_owned(),
            None => None,
        }
    }

    /// Given name is "John" in "John Doe".
    pub(crate) fn given_name(&self) -> Option<String> {
        match &self.google {
            Some(google) => google.given_name().to_owned(),
            None => None,
        }
    }

    /// Family name is "Doe" in "John Doe".
    pub(crate) fn family_name(&self) -> Option<String> {
        match &self.google {
            Some(google) => google.family_name().to_owned(),
            None => None,
        }
    }

    pub(crate) fn has_email_verified(&self) -> Option<bool> {
        match &self.google {
            Some(google) => google.is_email_verified().to_owned(),
            None => None,
        }
    }
}

impl AnyUser {
    pub(crate) fn id(&self) -> String {
        self._id.to_owned()
    }

    pub(crate) fn is_active(&self) -> bool {
        self.is_active.to_owned()
    }

    /// Name is a full name of the user ("John Doe").
    #[cfg(test)]
    pub(crate) fn name(&self) -> Option<String> {
        match &self.google {
            Some(google) => google.name().to_owned(),
            None => None,
        }
    }

    #[cfg(test)]
    pub(crate) fn mock(mock_id: &Option<String>) -> Self {
        Self {
            _id: match mock_id {
                Some(mock_id) => mock_id.to_string(),
                None => String::from("users/42yadada42"),
            },
            _rev: String::from(""),
            _key: String::from("42yadada42"),
            is_active: true,
            google: None,
        }
    }
}
