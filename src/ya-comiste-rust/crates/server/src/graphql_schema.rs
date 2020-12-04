use graphql::graphql_context::Context;
use juniper::{EmptyMutation, EmptySubscription, FieldError, FieldResult, RootNode};
use sdui::errors::ModelError;
use sdui::model::sdui_sections::get_all_sections_for_entrypoint_key;
use sdui::sdui_section::SDUISection;

#[derive(Clone, Copy, Debug)]
pub struct Query;

#[juniper::graphql_object(context = Context)]
impl Query {
    async fn mobile_entrypoint_sections(key: String) -> FieldResult<Vec<SDUISection>> {
        match get_all_sections_for_entrypoint_key(key).await {
            Ok(s) => Ok(s),
            // Err(e) => Err(FieldError::from(e)),
            Err(e) => match e {
                ModelError::DatabaseError(e) => Err(FieldError::from(e)), // TODO: hide and log these errors
                ModelError::LogicError(e) => Err(FieldError::from(e)),
            },
        }
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
