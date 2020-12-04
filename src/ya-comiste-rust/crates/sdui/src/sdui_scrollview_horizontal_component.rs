use graphql::graphql_context::Context;

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
}
