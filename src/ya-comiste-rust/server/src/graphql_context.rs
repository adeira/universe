use crate::auth::users::User;
use crate::sdui::model::component_content::ContentDataloaderType;

#[derive(Clone)]
pub struct Context {
    pub content_dataloader: ContentDataloaderType,
    pub pool: crate::arangodb::ConnectionPool,
    pub user: User,
}

impl juniper::Context for Context {}
