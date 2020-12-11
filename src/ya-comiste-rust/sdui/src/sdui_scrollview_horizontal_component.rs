use crate::graphql_context::Context;
use crate::model::scrollview_horizontal::get_card_components;
use crate::sdui_card_component::SDUICardComponent;
use juniper::{FieldError, FieldResult};

#[derive(Clone, Debug, serde::Deserialize)]
pub struct SDUIScrollViewHorizontalComponent {
    _id: String,
    _key: String,
    _rev: String,
}

#[juniper::graphql_object(context = Context)]
impl SDUIScrollViewHorizontalComponent {
    fn id(&self) -> juniper::ID {
        juniper::ID::new(&self._id)
    }

    async fn cards(&self, context: &Context) -> FieldResult<Vec<SDUICardComponent>> {
        let connection_pool = context.pool.to_owned();
        match get_card_components(connection_pool, &self._id).await {
            Ok(components) => Ok(components),
            Err(err) => Err(FieldError::from(err)),
        }
    }
}
