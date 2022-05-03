use crate::auth::dal::users::list_all_users;
use crate::auth::rbac;
use crate::auth::rbac::Actions::Users;
use crate::auth::rbac::UsersActions::GetAllUsers;
use crate::auth::users::{AnyUser, User};
use crate::graphql::AbacusGraphQLResult;
use crate::graphql_context::Context;
use juniper::FieldResult;

pub(crate) struct AuthQuery;
pub(crate) struct AuthMutation;

#[juniper::graphql_object(context = Context)]
impl AuthQuery {
    /// Returns information about the current user (can be authenticated or anonymous).
    async fn whoami(context: &Context) -> crate::auth::api::WhoamiPayload {
        crate::auth::api::whoami(context).await
    }

    async fn list_users(context: &Context) -> AbacusGraphQLResult<Vec<AnyUser>> {
        Ok(crate::auth::api::list_users(context).await?)
    }
}

#[juniper::graphql_object(context = Context)]
impl AuthMutation {
    /// This function accepts Google ID token (after receiving it from Google Sign-In in a webapp)
    /// and returns authorization payload. There is no concept of sign-in and sign-up: every
    /// whitelisted user with a valid JWT ID token will be authorized. Invalid tokens and users
    /// that are not whitelisted will be rejected.
    ///
    /// Repeated calls will result in a new session token (old sessions are not removed to support
    /// multiple logins on multiple devices). Original session token is returned back only once
    /// and cannot be retrieved later (it's irreversibly hashed in the database).
    async fn authorize_webapp(
        google_id_token: String,
        context: &Context,
    ) -> FieldResult<crate::auth::api::AuthorizeWebappPayload> {
        crate::auth::api::authorize_webapp(&google_id_token, context).await
    }

    /// The purpose of this `deauthorize` mutation is to remove the active sessions and effectively
    /// make the mobile application/webapp unsigned. Applications should remove the session token
    /// once de-authorized.
    ///
    /// Repeated calls will result in failure since it's not possible to deauthorize twice.
    async fn deauthorize(
        session_token: String, // TODO: this could be removed (?) - we can use the user from context
        context: &Context,
    ) -> crate::auth::api::DeauthorizePayload {
        crate::auth::api::deauthorize(&session_token, context).await
    }
}

#[derive(juniper::GraphQLObject)]
pub(crate) struct WhoamiPayload {
    id: Option<juniper::ID>,

    /// Human readable type should be used only for testing purposes. The format is not guaranteed
    /// and can change in the future completely.
    human_readable_type: Option<String>,

    /// Debug assertions indicates that the Rust server runs in a development mode (compiled without
    /// optimizations). FOR DEVELOPMENT ONLY!
    is_debug_assertions_enabled: bool,
}

pub(crate) async fn whoami(context: &Context) -> WhoamiPayload {
    match &context.user {
        User::SignedUser(user) => WhoamiPayload {
            id: Some(juniper::ID::from(user.id())),
            human_readable_type: Some(String::from("signed user")),
            is_debug_assertions_enabled: cfg!(debug_assertions),
        },
        User::AnonymousUser(user) => WhoamiPayload {
            id: Some(juniper::ID::from(user.id())),
            human_readable_type: Some(String::from("anonymous user")),
            is_debug_assertions_enabled: cfg!(debug_assertions),
        },
    }
}

pub(crate) async fn list_users(context: &Context) -> anyhow::Result<Vec<AnyUser>> {
    match rbac::verify_permissions(&context.user, &Users(GetAllUsers)).await {
        // only admin can list all the users
        Ok(_) => match list_all_users(&context.pool).await {
            Ok(list) => Ok(list),
            Err(e) => Err(e),
        },
        Err(_) => anyhow::bail!("not enough permissions to list all the users"),
    }
}

///// Mutations:

#[derive(juniper::GraphQLObject)]
pub(crate) struct AuthorizeWebappPayload {
    success: bool,

    /// Failure message is available only when success=false.
    failure_message: Option<String>,

    /// Session token should be send with every GraphQL request which requires auth.
    /// Returns `None` if the request was not successful.
    session_token: Option<String>,
}

#[derive(juniper::GraphQLObject)]
pub(crate) struct DeauthorizePayload {
    success: bool,
}

/// Webapp is currently using very simplified and minimalistic flow: it basically allows only
/// specific Google subjects to be authorized (admins). The thinking is that webapp login is needed
/// only for the backoffice and the access should be limited to admins. This should be easily
/// changeable in the future.
pub(crate) async fn authorize_webapp(
    google_id_token: &str,
    context: &Context,
) -> FieldResult<AuthorizeWebappPayload> {
    let connection_pool = context.pool.to_owned();
    let session_token = crate::auth::authorize(&connection_pool, google_id_token).await;
    match session_token {
        Ok(session_token) => Ok(AuthorizeWebappPayload {
            success: true,
            failure_message: None,
            session_token: Some(session_token),
        }),
        Err(e) => {
            tracing::error!("{}", e);
            Ok(AuthorizeWebappPayload {
                success: false,
                failure_message: Some(format!("{}", e)),
                session_token: None,
            })
        }
    }
}

pub(crate) async fn deauthorize(
    session_token: &str, // TODO: this could be removed (?) - we can use the user from context
    context: &Context,
) -> DeauthorizePayload {
    let connection_pool = context.pool.to_owned();
    match crate::auth::deauthorize(&connection_pool, session_token).await {
        Ok(_) => DeauthorizePayload { success: true },
        Err(_) => DeauthorizePayload { success: false },
    }
}
