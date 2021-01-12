use crate::auth::users::User;
use crate::graphql_context::Context;

#[derive(juniper::GraphQLObject)]
pub struct WhoamiPayload {
    id: Option<juniper::ID>,

    /// Human readable type should be used only for testing purposes. The format is not guaranteed
    /// and can change in the future completely.
    human_readable_type: Option<String>,
}

pub async fn whoami(context: &Context) -> WhoamiPayload {
    match &context.user {
        User::AdminUser(user) => WhoamiPayload {
            id: Some(juniper::ID::from(user.id())),
            human_readable_type: Some(String::from("admin user")),
        },
        User::AuthorizedUser(user) => WhoamiPayload {
            id: Some(juniper::ID::from(user.id())),
            human_readable_type: Some(String::from("authorized regular user")),
        },
        User::AnonymousUser(user) => WhoamiPayload {
            id: Some(juniper::ID::from(user.id())),
            human_readable_type: Some(String::from("anonymous user")),
        },
    }
}
