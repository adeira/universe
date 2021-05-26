use crate::auth::google::Claims;
use crate::auth::users::AnyUser;
use serde::Deserialize;

/// Signed user is an user that is logged in to the system. However, being "signed" doesn't say
/// anything about the permissions (see RBAC module).
///
/// It has assigned session token which might or might not be valid (might be expired for example).
#[derive(Clone, Deserialize)]
pub struct SignedUser {
    _id: String,
    _rev: String,
    _key: String,
    google: Option<Claims>,
}

impl SignedUser {
    pub(crate) fn id(&self) -> String {
        self._id.to_owned()
    }

    pub(crate) fn id_ref(&self) -> &str {
        self._id.as_ref()
    }
}

impl From<AnyUser> for SignedUser {
    fn from(user: AnyUser) -> Self {
        SignedUser {
            _id: user._id,
            _rev: user._rev,
            _key: user._key,
            google: None,
        }
    }
}
