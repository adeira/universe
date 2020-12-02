use graphql::graphql_context::Context;

#[derive(Clone, Debug, serde::Deserialize)]
pub struct SDUISection {
    pub id: juniper::ID,
    pub title: String,
}

// impl SDUISection {
//     fn not_exposed_to_graphql(&self) -> &str {
//         &self.title
//     }
// }

#[juniper::graphql_object(context = Context)]
impl SDUISection {
    #[graphql(description = "GraphQL description 🤯")]
    fn id(&self) -> &str {
        &self.id
    }

    fn title(&self) -> &str {
        &self.title
    }
}
