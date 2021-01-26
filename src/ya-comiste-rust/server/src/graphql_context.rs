use crate::auth::users::User;
use std::collections::HashMap;

#[derive(Clone)]
pub struct Context {
    pub pool: crate::arangodb::ConnectionPool,
    pub uploadables: Option<HashMap<String, Vec<u8>>>,
    pub user: User,
}

impl juniper::Context for Context {}
