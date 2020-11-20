use crate::graphql_context::Context;
use crate::sdui::SDUISection;
use crate::sdui_blocks::get_all_blocks;
use juniper::{EmptyMutation, EmptySubscription, FieldError, RootNode};

#[derive(Clone, Copy, Debug)]
pub struct Query;

#[juniper::graphql_object(context = Context)]
impl Query {
    async fn mobile_entrypoint_sections(id: juniper::ID) -> Result<Vec<SDUISection>, FieldError> {
        let resp = get_all_blocks(id).await;
        Ok(resp)
    }
}

pub type Schema = RootNode<'static, Query, EmptyMutation<Context>, EmptySubscription<Context>>;

pub fn create_graphql_schema() -> Schema {
    Schema::new(
        Query,
        EmptyMutation::<Context>::new(),
        EmptySubscription::<Context>::new(),
    )
}

#[cfg(test)]
mod tests {
    #[test]
    fn schema_snapshot() {
        insta::assert_snapshot!(super::create_graphql_schema().as_schema_language());
    }
}
