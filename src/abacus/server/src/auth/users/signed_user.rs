use crate::auth::users::AnyUser;
use serde::Deserialize;

/// Signed user is an user that is logged in to the system. However, being "signed" doesn't say
/// anything about the permissions (see RBAC module).
///
/// It has assigned session token which might or might not be valid (might be expired for example).
#[derive(Clone, Deserialize)]
pub struct SignedUser {
    pub _id: String,
    pub _rev: String,
    pub _key: String,
    // Unused: google: Option<Claims>,
}

impl SignedUser {
    pub fn id(&self) -> String {
        self._id.to_owned()
    }

    pub fn id_ref(&self) -> &str {
        self._id.as_ref()
    }
}

impl From<AnyUser> for SignedUser {
    fn from(user: AnyUser) -> Self {
        SignedUser {
            _id: user._id,
            _rev: user._rev,
            _key: user._key,
            // Unused: google: None,
        }
    }
}
