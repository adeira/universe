use crate::graphql_context::Context;
use crate::model::sdui_sections::get_section_components;
use crate::sdui_component::SDUIComponent;
use juniper::{FieldError, FieldResult};

#[derive(Clone, Debug, serde::Deserialize)]
pub struct SDUISection {
    _id: String,
    _key: String,
    _rev: String,
    _from: String,
    _to: String,
    order: i16, // ±32767
}

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
        let components = get_section_components(
            &context.user,
            &connection_pool,
            &self._from.to_string(),
            &self._id.to_string(),
            &supported,
        )
        .await;

        match components {
            Ok(c) => Ok(match c.first() {
                Some(component) => Some(component.to_owned()),
                None => {
                    log::warn!(
                        "No component found for section ID '{}' and supported selection: {}",
                        &self._id,
                        &supported.join(", ")
                    );
                    None
                }
            }),
            Err(e) => Err(FieldError::from(e)),
        }
    }
}
