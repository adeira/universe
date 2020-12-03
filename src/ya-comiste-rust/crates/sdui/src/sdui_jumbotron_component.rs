use graphql::graphql_context::Context;

#[derive(Clone, Debug, serde::Deserialize)]
pub struct SDUIJumbotronComponent {
    pub id: String,
}

#[juniper::graphql_object(context = Context)]
impl SDUIJumbotronComponent {
    fn id(&self) -> juniper::ID {
        juniper::ID::new(&self.id)
    }
}
