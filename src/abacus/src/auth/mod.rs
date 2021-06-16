use crate::auth::certs::CachedCerts;
use crate::auth::dal::sessions::{
    create_new_user_session, delete_user_session, find_session_by_user,
};
use crate::auth::dal::users::{find_user_by_google_claims, get_user_by_session_token_hash};
use crate::auth::error::AuthError;
use crate::auth::google::verify_id_token_integrity;
use crate::auth::session::derive_session_token_hash;
use crate::auth::users::{AnonymousUser, SignedUser, User};

pub(crate) mod api;
pub(crate) mod rbac;
pub(crate) mod users;

mod cache_control;
mod certs;
mod dal;
mod error;
mod google;
mod session;

/// This function tries to authorize the user by Google ID token (rejects otherwise). It essentially
/// transforms Google ID token to our Session Token which is vendor independent and we have it under
/// absolute control.
///
/// 1.  Validate the Google ID token (and immediately reject if not valid).
/// 2a. Fetch existing user and create a new session even if it already exists (and deauthorized
///     the old session token if any). Please note: it's not possible to simply return the session
///     token after first authorization because it's hashed in the DB and we cannot reverse it.
///     We have to always generate a new one because it could happen that user lost the session
///     token and would not be able to logout/login anymore (so re-authentication simply
///     means a new authentication).
/// 2b. Reject any requests attempting to access non-existent users.
pub(in crate::auth) async fn authorize(
    pool: &crate::arangodb::ConnectionPool,
    google_id_token: &str,
) -> Result<String, error::AuthError> {
    let mut cached_certs = certs::CachedCertsProduction::new();
    let token_data = verify_id_token_integrity(&google_id_token, &mut cached_certs).await?; // (1.)

    match find_user_by_google_claims(&pool, &token_data.claims.subject()).await {
        // the user already exists (2a.)
        Some(user) => {
            if !user.is_active() {
                return Err(AuthError::AccessDenied(String::from("user is not active")));
            }

            if let Some(session) = find_session_by_user(&pool, &user).await {
                // first, delete the old session (so we don't have many old but valid sessions)
                delete_user_session(&pool, &session.session_token_hash()).await?;
            }

            // create a new session
            let session_token = session::generate_session_token();
            let session_token_hash = derive_session_token_hash(&session_token);
            create_new_user_session(&pool, &session_token_hash, &user).await?;
            Ok(session_token)
        }
        // new user with valid Google ID token - reject it (2b.)
        None => Err(AuthError::AccessDenied(String::from(
            "user is not whitelisted",
        ))),
    }
}

/// This function "deauthorizes" the user by invalidating the session in our DB (removing it).
/// It returns `true` if the operation was successful.
pub(in crate::auth) async fn deauthorize(
    pool: &crate::arangodb::ConnectionPool,
    session_token: &str,
) -> Result<bool, error::AuthError> {
    let session_token_hash = derive_session_token_hash(&session_token);
    delete_user_session(&pool, &session_token_hash).await?;
    Ok(true) // success
}

/// This function verifies the session token and returns either authorized OR anonymous user.
pub(in crate) async fn resolve_user_from_session_token(
    pool: &crate::arangodb::ConnectionPool,
    session_token: &str,
) -> User {
    let session_token_hash = derive_session_token_hash(&session_token);
    // TODO: make sure that webapp session tokens are expiring sooner (not after one year)
    match get_user_by_session_token_hash(&pool, &session_token_hash).await {
        Ok(user) => User::SignedUser(SignedUser::from(user)),
        Err(error) => {
            tracing::error!("{}", error);
            User::AnonymousUser(AnonymousUser::new())
        }
    }
}
