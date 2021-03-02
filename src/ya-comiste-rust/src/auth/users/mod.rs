pub use crate::auth::users::admin_user::AdminUser;
pub use crate::auth::users::anonymous_user::AnonymousUser;
pub use crate::auth::users::authorized_user::AuthorizedUser;
use juniper::GraphQLObject;
use serde::Deserialize;

mod admin_user;
mod anonymous_user;
mod authorized_user;

#[derive(Clone, Deserialize)]
pub enum User {
    AdminUser(AdminUser),
    AnonymousUser(AnonymousUser),
    AuthorizedUser(AuthorizedUser),
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
    r#type: String,
}

impl AnyUser {
    pub(crate) fn id(&self) -> String {
        self._id.to_owned()
    }

    pub(crate) fn r#type(&self) -> String {
        self.r#type.to_owned()
    }

    #[cfg(test)]
    pub(crate) fn mock() -> Self {
        Self {
            _id: String::from("users/42"),
            _rev: String::from(""),
            _key: String::from("42"),
            r#type: String::from("regular"),
        }
    }
}
