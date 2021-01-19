use crate::graphql_context::Context;
use crate::images::resolve_cloudfront_url;
use crate::sdui::sdui_content::SDUIContent;
use juniper::{FieldError, FieldResult};

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

    #[graphql(description = "Title is a crucial part of the card component so it's not optional.")]
    async fn title(&self, context: &Context) -> FieldResult<String> {
        let content = context.content_dataloader.load(self._id.to_owned()).await;
        match content {
            Some(c) => match c {
                SDUIContent::Restaurant(restaurant) => Ok(restaurant.name),
                SDUIContent::Shop(shop) => Ok(shop.name),
            },
            None => Err(FieldError::from(format!(
                "No title found for card component ID: {}",
                &self._id,
            ))),
        }
    }

    async fn image_background_url(&self, context: &Context) -> Option<String> {
        let content = context.content_dataloader.load(self._id.to_owned()).await;
        match content {
            Some(c) => match c {
                SDUIContent::Restaurant(restaurant) => match restaurant.image_background {
                    Some(image_background) => Some(resolve_cloudfront_url(&*image_background)),
                    None => None,
                },
                SDUIContent::Shop(shop) => match shop.image_background {
                    Some(image_background) => Some(resolve_cloudfront_url(&*image_background)),
                    None => None,
                },
            },
            None => None,
        }
    }
}
