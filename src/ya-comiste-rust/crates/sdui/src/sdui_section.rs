use crate::model::sdui_sections::get_section_components;
use crate::sdui_component::SDUIComponent;
use graphql::graphql_context::Context;
use juniper::{FieldError, FieldResult};

#[derive(Clone, Debug, serde::Deserialize)]
pub struct SDUISection {
    _id: String,
    _key: String,
    _rev: String,
    order: i16, // ±32767
}

// impl SDUISection {
//     fn not_exposed_to_graphql(&self) -> &str {
//         &self.title
//     }
// }

#[juniper::graphql_object(context = Context)]
impl SDUISection {
    fn id(&self) -> juniper::ID {
        juniper::ID::new(&self._id)
    }

    async fn component(
        &self,
        supported: Vec<String>,
        context: &Context,
    ) -> FieldResult<Option<SDUIComponent>> {
        // We might get a component which is not supported by the client yet (defined by `supported`).
        let connection_pool = context.pool.to_owned();
        let components =
            get_section_components(connection_pool, self._id.to_string(), supported).await;
        match components {
            Ok(c) => Ok(match c.first() {
                Some(component) => Some(component.to_owned()),
                None => None, // TODO: log this missing supported component situation (?)
            }),
            Err(e) => Err(FieldError::from(e)),
        }
    }
}
