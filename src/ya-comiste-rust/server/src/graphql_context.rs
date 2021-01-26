use crate::auth::users::User;
use crate::sdui::model::component_content::ContentDataloaderType;
use std::collections::HashMap;

#[derive(Clone)]
pub struct Context {
    pub content_dataloader: ContentDataloaderType,
    pub pool: crate::arangodb::ConnectionPool,
    pub user: User,
    pub uploadables: Option<HashMap<String, Vec<u8>>>,
}

impl juniper::Context for Context {}
