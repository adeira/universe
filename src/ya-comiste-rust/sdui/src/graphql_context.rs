use crate::model::component_content::ContentDataloaderType;
use auth::users::User;

#[derive(Clone)]
pub struct Context {
    pub content_dataloader: ContentDataloaderType,
    pub pool: arangodb::ConnectionPool,
    pub user: User,
}

impl juniper::Context for Context {}
