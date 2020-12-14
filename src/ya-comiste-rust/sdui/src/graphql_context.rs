use crate::model::component_content::ContentDataloaderType;
use crate::user::User;

#[derive(Clone)]
pub struct Context {
    pub pool: arangodb::ConnectionPool,
    pub content_dataloader: ContentDataloaderType,
    pub user: User,
}

impl juniper::Context for Context {}
