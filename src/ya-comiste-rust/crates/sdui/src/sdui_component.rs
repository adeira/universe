use crate::sdui_card_component::SDUICardComponent;
use crate::sdui_description_component::SDUIDescriptionComponent;
use crate::sdui_jumbotron_component::SDUIJumbotronComponent;
use crate::sdui_scrollview_horizontal_component::SDUIScrollViewHorizontalComponent;
use graphql::graphql_context::Context;
use juniper::GraphQLUnion;

#[derive(Clone, Debug, serde::Deserialize, GraphQLUnion)]
#[graphql(Context = Context)]
#[serde(tag = "typename")]
pub enum SDUIComponent {
    SDUICardComponent(SDUICardComponent),
    SDUIDescriptionComponent(SDUIDescriptionComponent),
    SDUIJumbotronComponent(SDUIJumbotronComponent),
    SDUIScrollViewHorizontalComponent(SDUIScrollViewHorizontalComponent),
}
