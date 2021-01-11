use crate::arangodb::errors::ModelError;
use crate::graphql_context::Context;
use crate::sdui::model::sdui_sections::get_all_sections_for_entrypoint_key;
use crate::sdui::sdui_section::SDUISection;
use juniper::{FieldError, FieldResult};

// struct SDUIContext {
//     pool: arangodb::ConnectionPool,
// }
//
// impl FromContext<Context> for SDUIContext {
//     fn from(ctx: &Context) -> SDUIContext {
//         SDUIContext {
//             pool: ctx.pool.clone(),
//         }
//     }
// }

pub async fn mobile_entrypoint_sections(
    key: String,
    context: &Context,
) -> FieldResult<Vec<SDUISection>> {
    let connection_pool = context.pool.to_owned();
    match get_all_sections_for_entrypoint_key(&context.user, &connection_pool, &key).await {
        Ok(s) => Ok(s),
        // Err(e) => Err(FieldError::from(e)),
        Err(e) => match e {
            ModelError::DatabaseError(e) => Err(FieldError::from(e)), // TODO: hide and log these errors
            ModelError::LogicError(e) => Err(FieldError::from(e)),
            ModelError::SerdeError(e) => Err(FieldError::from(e)),
        },
    }
}
