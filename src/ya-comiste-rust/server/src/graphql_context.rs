#[cfg(test)]
use crate::arangodb::get_database_connection_pool;
#[cfg(test)]
use crate::auth::users::AnonymousUser;
use crate::auth::users::User;
use std::collections::HashMap;

#[derive(Clone)]
pub struct ContextUploadable {
    data: Vec<u8>,
    content_type: String,
}

impl ContextUploadable {
    pub fn new(data: Vec<u8>, content_type: String) -> Self {
        ContextUploadable { data, content_type }
    }
}

#[derive(Clone)]
pub struct Context {
    pub pool: crate::arangodb::ConnectionPool,
    pub uploadables: Option<HashMap<String, ContextUploadable>>,
    pub user: User,
}

impl juniper::Context for Context {}

#[cfg(test)]
impl Context {
    pub fn create_mock() -> Self {
        Self {
            pool: get_database_connection_pool(None),
            uploadables: None,
            user: User::AnonymousUser(AnonymousUser::new()),
        }
    }
}
