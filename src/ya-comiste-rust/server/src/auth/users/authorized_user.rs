use crate::auth::google::Claims;
use serde::Deserialize;

/// Authorized user is an user which was granted the permission to access restricted resources.
/// It has assigned session token which might or might not be valid (might be expired for example).
#[derive(Clone, Deserialize)]
pub struct AuthorizedUser {
    _id: String,
    _rev: String,
    _key: String,
    session_token: String,
    google: Option<Claims>,
}

impl AuthorizedUser {
    pub fn id(&self) -> String {
        self._id.to_owned()
    }
}
