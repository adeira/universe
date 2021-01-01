use crate::sdui::graphql_context::Context;
use crate::sdui::sdui_card_component::SDUICardComponent;
use crate::sdui::sdui_description_component::SDUIDescriptionComponent;
use crate::sdui::sdui_jumbotron_component::SDUIJumbotronComponent;
use crate::sdui::sdui_scrollview_horizontal_component::SDUIScrollViewHorizontalComponent;
use juniper::GraphQLUnion;

#[derive(Clone, Debug, serde::Deserialize, GraphQLUnion)]
#[graphql(Context = Context)]
#[serde(tag = "_serde_union_tag", content = "_serde_union_content")] // https://serde.rs/enum-representations.html#adjacently-tagged
pub enum SDUIComponent {
    SDUICardComponent(SDUICardComponent),
    SDUIDescriptionComponent(SDUIDescriptionComponent),
    SDUIJumbotronComponent(SDUIJumbotronComponent),
    SDUIScrollViewHorizontalComponent(SDUIScrollViewHorizontalComponent),
}
