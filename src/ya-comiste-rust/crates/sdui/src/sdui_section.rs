use crate::model::sdui_sections::get_section_component;
use crate::sdui_component::SDUIComponent;
use graphql::graphql_context::Context;

#[derive(Clone, Debug, serde::Deserialize)]
pub struct SDUISection {
    pub id: String,
    pub component: Option<SDUIComponent>,
}

// impl SDUISection {
//     fn not_exposed_to_graphql(&self) -> &str {
//         &self.title
//     }
// }

#[juniper::graphql_object(context = Context)]
impl SDUISection {
    fn id(&self) -> juniper::ID {
        juniper::ID::new(&self.id)
    }

    async fn component(&self, supported: Vec<String>) -> Option<SDUIComponent> {
        // We might get a component which is not supported by the client yet (defined by `supported`).
        match get_section_component(self.id.to_string(), supported).await {
            Ok(component) => Some(component),
            Err(_) => None,
        }
    }
}
