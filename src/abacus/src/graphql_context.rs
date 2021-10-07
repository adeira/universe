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

#[derive(Clone, Default)]
pub struct GlobalConfiguration {
    // TODO: remove from `graphql_context` module (it's global for the application, not just GraphQL)
    pub stripe_restricted_api_key: Option<String>,
}

#[derive(Clone)]
pub struct Context {
    pub pool: crate::arango::ConnectionPool,
    pub uploadables: Option<HashMap<String, ContextUploadable>>,
    pub user: User,
    pub global_configuration: GlobalConfiguration,
}

impl juniper::Context for Context {}

#[cfg(test)]
impl Context {
    pub fn create_mock() -> Self {
        Self {
            pool: get_database_connection_pool_mock(),
            uploadables: None,
            user: User::AnonymousUser(AnonymousUser::new()),
            global_configuration: GlobalConfiguration {
                stripe_restricted_api_key: None,
            },
        }
    }
}
