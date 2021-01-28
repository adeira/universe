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
