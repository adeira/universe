use graphql::graphql_context::Context;

/// TODO: maybe `MobileEntrypoint` would be a better name so we are future proof?
#[derive(Clone, Debug, serde::Deserialize)]
pub struct Entrypoint {
    pub _id: juniper::ID,
    pub _key: String,
}

#[juniper::graphql_object(context = Context)]
impl Entrypoint {
    fn id(&self) -> &str {
        &self._id
    }
}
