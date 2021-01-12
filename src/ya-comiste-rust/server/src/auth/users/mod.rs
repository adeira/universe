pub use crate::auth::users::admin_user::AdminUser;
pub use crate::auth::users::anonymous_user::AnonymousUser;
pub use crate::auth::users::authorized_user::AuthorizedUser;

mod admin_user;
mod anonymous_user;
mod authorized_user;

#[derive(Clone, serde::Deserialize)]
pub enum User {
    AdminUser(AdminUser),
    AnonymousUser(AnonymousUser),
    AuthorizedUser(AuthorizedUser),
}

/// AnyUser represents any generic user in the database which can later be converted to the right
/// type (admin/anonymous/authorized) as needed.
#[derive(Clone, serde::Deserialize)]
pub struct AnyUser {
    _id: String,
    _rev: String,
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
}
