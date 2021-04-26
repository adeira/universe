use crate::auth::google::Claims;
use crate::auth::users::AnyUser;
use serde::Deserialize;

/// Authorized user is an user which was granted the permission to access restricted resources.
/// It has assigned session token which might or might not be valid (might be expired for example).
#[derive(Clone, Deserialize)]
pub struct AuthorizedUser {
    _id: String,
    _rev: String,
    _key: String,
    google: Option<Claims>,
}

impl AuthorizedUser {
    pub(crate) fn id(&self) -> String {
        self._id.to_owned()
    }
}

impl From<AnyUser> for AuthorizedUser {
    fn from(user: AnyUser) -> Self {
        AuthorizedUser {
            _id: user._id,
            _rev: user._rev,
            _key: user._key,
            google: None,
        }
    }
}
