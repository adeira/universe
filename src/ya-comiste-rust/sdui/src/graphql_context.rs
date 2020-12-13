use crate::model::component_content::ContentDataloaderType;

#[derive(Clone)]
pub struct Context {
    pub pool: arangodb::ConnectionPool,
    pub content_dataloader: ContentDataloaderType,
}

impl juniper::Context for Context {}
