use crate::auth::certs::CachedCerts;
use crate::auth::dal::sessions::{
    create_new_user_session, delete_user_session, find_session_by_user,
};
use crate::auth::dal::users::{
    create_user_by_google_claims, find_user_by_google_claims, get_user_by_session_token_hash,
};
use crate::auth::error::AuthError;
use crate::auth::google::verify_id_token_integrity;
use crate::auth::session::derive_session_token_hash;
use crate::auth::users::{AdminUser, AnonymousUser, AuthorizedUser, User};

pub(crate) mod api;
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
/// 2b. Create a new user if it doesn't exist yet and generate and store new session token.
pub(in crate::auth) async fn authorize(
    pool: &crate::arangodb::ConnectionPool,
    google_id_token: &str,
    whitelisted_google_subs: &Option<Vec<&str>>,
) -> Result<String, error::AuthError> {
    let mut cached_certs = certs::CachedCertsProduction::new();
    let token_data = verify_id_token_integrity(&google_id_token, &mut cached_certs).await?; // (1.)
    let token_sub = token_data.claims.subject();

    if let Some(whitelisted_google_subs) = whitelisted_google_subs {
        if whitelisted_google_subs
            .iter()
            .find(|&sub| sub == token_sub)
            .is_none()
        {
            return Err(error::AuthError::InvalidToken(format!(
                "Cannot authorize this token because its subject is not whitelisted ({}).",
                token_sub
            )));
        }
    }

    match find_user_by_google_claims(&pool, &token_data.claims.subject()).await {
        // the user already exists (2a.)
        Some(user) => {
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
        // new user with valid Google ID token - let's register it (2b.)
        None => match create_user_by_google_claims(&pool, &token_data.claims).await {
            Ok(new_user) => {
                let session_token = session::generate_session_token();
                let session_token_hash = derive_session_token_hash(&session_token);
                create_new_user_session(&pool, &session_token_hash, &new_user).await?;
                Ok(session_token)
            }
            Err(e) => Err(AuthError::DatabaseError(e)),
        },
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
        Ok(user) => match user.r#type().as_ref() {
            "regular" => User::AuthorizedUser(AuthorizedUser::from(user)),
            "admin" => User::AdminUser(AdminUser::from(user)),
            _ => User::AnonymousUser(AnonymousUser::new()),
        },
        Err(_) => User::AnonymousUser(AnonymousUser::new()),
    }
}
