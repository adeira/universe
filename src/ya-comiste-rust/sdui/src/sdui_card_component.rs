use crate::graphql_context::Context;
use crate::model::component_content::get_component_content;
use crate::sdui_content::SDUIContent;
use juniper::FieldResult;

#[derive(Clone, Debug, serde::Deserialize)]
pub struct SDUICardComponent {
    _id: String,
    _key: String,
    _rev: String,
}

#[juniper::graphql_object(context = Context)]
impl SDUICardComponent {
    fn id(&self) -> juniper::ID {
        juniper::ID::new(&self._id)
    }

    fn entrypoint_key(&self) -> String {
        // TODO: create a new edge collection with the links
        "com.yaComiste.ExploreDetail".to_string()
    }

    async fn title(&self, context: &Context) -> FieldResult<String> {
        let content = get_component_content(&context.pool, &self._id).await?;

        match content {
            SDUIContent::Restaurant(restaurant) => Ok(restaurant.name),
            SDUIContent::Shop(shop) => Ok(shop.name),
        }
    }
}
