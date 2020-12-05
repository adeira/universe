#[derive(Clone)]
pub struct Context {
    pub pool: arangodb::ConnectionPool,
}

impl juniper::Context for Context {}
