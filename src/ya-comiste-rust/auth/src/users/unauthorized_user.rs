use crate::google::Claims;
use serde::Deserialize;

/// Unauthorized user is a user which has been identified but it's not authorized/authenticated yet.
/// It doesn't have any sessions information so it cannot be used for accessing restricted resources.
#[derive(Clone, Deserialize)]
pub struct UnauthorizedUser {
    _id: String,
    _rev: String,
    _key: String,
    google: Option<Claims>,
}

impl UnauthorizedUser {
    pub fn id(&self) -> String {
        self._id.to_owned()
    }
}
