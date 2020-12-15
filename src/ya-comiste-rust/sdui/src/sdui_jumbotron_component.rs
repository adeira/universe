use crate::graphql_context::Context;

#[derive(Clone, Debug, serde::Deserialize)]
pub struct SDUIJumbotronComponent {
    _id: String,
    _key: String,
    _rev: String,
}

#[juniper::graphql_object(context = Context)]
impl SDUIJumbotronComponent {
    fn id(&self) -> juniper::ID {
        juniper::ID::new(&self._id)
    }

    fn title(&self) -> String {
        // TODO
        "TODO from SDUIJumbotronComponent (Rust BE)".to_string()
    }
}
