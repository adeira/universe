use crate::auth::users::User;
use crate::graphql_context::Context;
use juniper::FieldResult;

#[derive(juniper::GraphQLObject)]
pub(crate) struct WhoamiPayload {
    id: Option<juniper::ID>,

    /// Human readable type should be used only for testing purposes. The format is not guaranteed
    /// and can change in the future completely.
    human_readable_type: Option<String>,
}

pub(crate) async fn whoami(context: &Context) -> WhoamiPayload {
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

///// Mutations:

#[derive(juniper::GraphQLObject)]
pub(crate) struct AuthorizeMobilePayload {
    success: bool,

    /// Session token should be send with every GraphQL request which requires auth.
    /// Returns `None` if the request was not successful.
    session_token: Option<String>,
}

#[derive(juniper::GraphQLObject)]
pub(crate) struct DeauthorizeMobilePayload {
    success: bool,
}

pub(crate) async fn authorize_mobile(
    google_id_token: &str,
    context: &Context,
) -> FieldResult<AuthorizeMobilePayload> {
    let connection_pool = context.pool.to_owned();
    let session_token = crate::auth::authorize(&connection_pool, &google_id_token).await;
    match session_token {
        Ok(session_token) => Ok(AuthorizeMobilePayload {
            success: true,
            session_token: Some(session_token),
        }),
        Err(e) => {
            log::error!("{}", e);
            Ok(AuthorizeMobilePayload {
                success: false,
                session_token: None,
                // TODO: return rejection reason from AuthError as well (?)
            })
        }
    }
}

pub(crate) async fn deauthorize_mobile(
    session_token: &str, // TODO: this could be removed (?) - we can use the user from context
    context: &Context,
) -> DeauthorizeMobilePayload {
    let connection_pool = context.pool.to_owned();
    match crate::auth::deauthorize(&connection_pool, &session_token).await {
        Ok(_) => DeauthorizeMobilePayload { success: true },
        Err(_) => DeauthorizeMobilePayload { success: false },
    }
}
