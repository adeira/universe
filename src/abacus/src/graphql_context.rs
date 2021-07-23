#[cfg(test)]
use crate::arango::get_database_connection_pool_mock;
#[cfg(test)]
use crate::auth::users::AnonymousUser;
use crate::auth::users::User;
use std::collections::HashMap;

#[derive(Clone)]
pub enum ContextUploadableContentType {
    ImagePng,
    ImageJpeg,
}

#[derive(Clone)]
pub struct ContextUploadable {
    data: Vec<u8>,
    content_type: ContextUploadableContentType,
}

impl ContextUploadable {
    pub fn new(data: Vec<u8>, content_type: ContextUploadableContentType) -> Self {
        ContextUploadable { data, content_type }
    }

    pub fn data(&self) -> Vec<u8> {
        self.data.to_owned()
    }

    pub fn content_type(&self) -> ContextUploadableContentType {
        self.content_type.to_owned()
    }
}

#[derive(Clone)]
pub struct Context {
    pub pool: crate::arango::ConnectionPool,
    pub uploadables: Option<HashMap<String, ContextUploadable>>,
    pub user: User,
}

impl juniper::Context for Context {}

#[cfg(test)]
impl Context {
    pub fn create_mock() -> Self {
        Self {
            pool: get_database_connection_pool_mock(),
            uploadables: None,
            user: User::AnonymousUser(AnonymousUser::new()),
        }
    }
}
