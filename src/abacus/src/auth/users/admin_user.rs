use crate::auth::google::Claims;
use crate::auth::users::AnyUser;
use serde::Deserialize;

#[derive(Clone, Deserialize)]
pub struct AdminUser {
    _id: String,
    _rev: String,
    _key: String,
    google: Option<Claims>,
}

impl AdminUser {
    pub(crate) fn id(&self) -> String {
        self._id.to_owned()
    }
}

impl From<AnyUser> for AdminUser {
    fn from(user: AnyUser) -> Self {
        AdminUser {
            _id: user._id,
            _rev: user._rev,
            _key: user._key,
            google: None,
        }
    }
}
