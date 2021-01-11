use crate::auth::certs::CachedCerts;
use crate::auth::error::AuthError;
use crate::auth::google::verify_id_token_integrity;
use crate::auth::session::{create_user_session, delete_user_session, find_session_by_user};
use crate::auth::users::{
    create_user_by_google_claims, find_user_by_google_claims, get_user_by_session_token,
    AnonymousUser, User,
};

pub(crate) mod api;
pub(crate) mod certs;
pub(crate) mod google;
pub(crate) mod session;
pub(crate) mod users;

mod cache_control;
mod error;

/// This function tries to authorize the user by Google ID token (rejects otherwise).
///
/// 1. validate the Google ID token (and immediately reject if not valid)
/// 2a. retrieve the existing user
/// 2b. create a new user (if it doesn't exist yet)
/// 3. generate and store new sessions token for this user and return it back
///
/// It essentially transforms Google ID token to our Session Token.
pub async fn authorize(
    pool: &crate::arangodb::ConnectionPool,
    google_id_token: &str,
) -> Result<String, error::AuthError> {
    let mut cached_certs = certs::CachedCertsProduction::new();
    let token_data = verify_id_token_integrity(&google_id_token, &mut cached_certs).await?; // (1.)

    match find_user_by_google_claims(&pool, &token_data.claims.subject()).await {
        Some(user) => {
            // the user already exists (2a.)
            match find_session_by_user(&pool, &user).await {
                Some(session) => Ok(session.key()), // session already exists, good (3.)
                None => {
                    // session doesn't exist (but user does), let's create a new session
                    let session_token = session::generate_session_token();
                    create_user_session(&pool, &session_token, &user).await?;
                    Ok(session_token) // (3.)
                }
            }
        }
        None => {
            // new user with valid Google ID token - let's register it (2b.)
            match create_user_by_google_claims(&pool, &token_data.claims).await {
                Ok(new_user) => {
                    let session_token = session::generate_session_token();
                    create_user_session(&pool, &session_token, &new_user).await?;
                    Ok(session_token) // (3.)
                }
                Err(e) => Err(AuthError::DatabaseError(e)),
            }
        }
    }
}

/// This function "deauthorizes" the user by invalidating the session in our DB (removing it).
/// It returns `true` if the operation was successful.
pub async fn deauthorize(
    pool: &crate::arangodb::ConnectionPool,
    session_token: &str,
) -> Result<bool, error::AuthError> {
    delete_user_session(&pool, &session_token).await?;
    Ok(true) // success
}

/// This function verifies the session token and returns either authorized OR anonymous user.
pub async fn resolve_user_from_session_token(
    pool: &crate::arangodb::ConnectionPool,
    session_token: &str,
) -> User {
    match get_user_by_session_token(&pool, &session_token).await {
        Ok(user) => User::AuthorizedUser(user),
        Err(_) => User::AnonymousUser(AnonymousUser::new()),
    }
}
