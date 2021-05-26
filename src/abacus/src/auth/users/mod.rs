pub use crate::auth::users::anonymous_user::AnonymousUser;
pub use crate::auth::users::signed_user::SignedUser;
use juniper::GraphQLObject;
use serde::Deserialize;

mod anonymous_user;
mod signed_user;

#[derive(Clone, Deserialize)]
pub enum User {
    AnonymousUser(AnonymousUser),
    SignedUser(SignedUser),
}

/// AnyUser represents any generic user in the database which can later be converted to the right
/// type (admin/anonymous/authorized) as needed.
#[derive(Clone, serde::Deserialize, GraphQLObject)]
#[graphql(description = "")]
pub struct AnyUser {
    #[graphql(name = "id")]
    _id: String,
    #[graphql(skip)]
    _rev: String,
    #[graphql(skip)]
    _key: String,
}

impl AnyUser {
    pub(crate) fn id(&self) -> String {
        self._id.to_owned()
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
        }
    }
}
