use graphql::graphql_context::Context;

#[derive(Clone, Debug, serde::Deserialize)]
pub struct SDUICardComponent {
    pub id: String,
}

#[juniper::graphql_object(context = Context)]
impl SDUICardComponent {
    fn id(&self) -> juniper::ID {
        juniper::ID::new(&self.id)
    }
}
