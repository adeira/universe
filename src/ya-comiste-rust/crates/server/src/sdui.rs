use crate::graphql_context::Context;

/// Entrypoint represents a single entrypoint of the mobile application.
/// TODO: maybe `MobileEntrypoint` would be a better name so we are future proof?
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
