use crate::arango;
use crate::auth::account::Account;
use crate::auth::certs::CachedCerts;
use crate::auth::dal::accounts;
use crate::auth::dal::sessions::{create_new_user_session, delete_user_session};
use crate::auth::dal::users::{
    create_inactive_user_by_google_claims, find_user_by_google_claims,
    get_user_by_session_token_hash,
};
use crate::auth::google::verify_id_token_integrity;
use crate::auth::session::derive_session_token_hash;
use crate::auth::users::{AnonymousUser, AnyUser, SignedUser, User};
use crate::headers::parse_authorization_header;

pub(crate) mod api;
pub(crate) mod rbac;
pub(crate) mod users;

mod account;
mod cache_control;
mod casbin;
mod certs;
mod dal;
mod google;
mod session;

/// This function tries to authorize a user by Google ID token (registers otherwise). It essentially
/// transforms Google ID token to our Session Token, which is vendor independent, and we have it
/// under absolute control.
///
/// 1.  Validate the Google ID token (and immediately reject if not valid).
/// 2a. Fetch existing user and create a new session even if it already exists. Please note: it's
///     not possible to simply return the session token after first authorization because it's
///     hashed in the DB and we cannot reverse it. We have to always generate a new one because it
///     could happen that user lost the session token and would not be able to logout/login anymore
///     (so re-authentication simply means a new authentication).
/// 2b. Reject any requests attempting to access non-existent users. At the same time, create this
///     user (inactive) so it can be later activated (whitelisted).
pub(in crate::auth) async fn authorize(
    pool: &arango::ConnectionPool,
    google_id_token: &str,
) -> anyhow::Result<String> {
    let mut cached_certs = certs::CachedCertsProduction::new();
    let token_data = verify_id_token_integrity(google_id_token, &mut cached_certs).await?; // (1.)

    let user = find_user_by_google_claims(pool, token_data.claims.subject()).await;

    let session_token = match user {
        // 2a. the user already exists
        Some(user) => {
            ensure_user_account_exists(&pool, &user).await?;

            if !user.is_active() {
                anyhow::bail!("user is not activated yet");
            }

            // create a new session (don't delete old ones so we can login from multiple devices)
            let session_token = session::generate_session_token();
            let session_token_hash = derive_session_token_hash(&session_token);
            create_new_user_session(&pool, &session_token_hash, &user).await?;
            session_token
        }
        None => {
            // 2b. new user with valid Google ID token - create and reject it
            let inactive_user =
                create_inactive_user_by_google_claims(pool, &token_data.claims).await?;

            ensure_user_account_exists(&pool, &inactive_user).await?;

            anyhow::bail!("user does not exist yet")
        }
    };

    Ok(session_token)
}

/// Historically, the concept of "accounts" didn't exist. We need to make sure that each user is
/// assigned to some account, and therefore we create it here if none exists. Users without
/// accounts are not allowed!
async fn ensure_user_account_exists(
    pool: &arango::ConnectionPool,
    user: &AnyUser,
) -> anyhow::Result<()> {
    let accounts = accounts::find_user_accounts(&pool, &user).await?;
    match accounts.is_empty() {
        true => {
            // Create a new account for the user
            accounts::create_new_account(&pool, &user).await?;
        }
        false => {
            // User already has some account(s) assigned, nothing to do.
        }
    }

    Ok(())
}

/// This function "deauthorizes" the user by invalidating the session in our DB (removing it).
/// It returns `true` if the operation was successful.
pub(in crate::auth) async fn deauthorize(
    pool: &arango::ConnectionPool,
    session_token: &str,
) -> anyhow::Result<bool> {
    let session_token_hash = derive_session_token_hash(session_token);
    delete_user_session(pool, &session_token_hash).await?;
    Ok(true) // success
}

/// Resolves a user from the authorization header value. It returns anonymous user
/// in case there is no authorization header. Otherwise, it tries to resolve the actual
/// user (or returns an error if auth header exists but user does not or if the header has
/// invalid format).
pub(crate) async fn get_current_user(
    pool: &arango::ConnectionPool,
    authorization_header: &Option<String>,
) -> Result<User, String> {
    match authorization_header {
        Some(authorization_header) => {
            // auth header exists, let's try to parse it
            match parse_authorization_header(authorization_header) {
                Ok(session_token) => {
                    // auth header successfully parsed (unverified)
                    match crate::auth::resolve_user_from_session_token(pool, &session_token).await {
                        User::AnonymousUser(_) => {
                            tracing::error!("Unmatched session token 🛑");
                            Err(String::from("Session token doesn't match any user."))
                        }
                        User::SignedUser(user) => {
                            tracing::debug!("Using SIGNED user: {}", user.id());
                            Ok(User::SignedUser(user))
                        }
                    }
                }
                Err(_) => Err(String::from(
                    "Unable to parse 'authorization' header (should be 'Bearer XYZ').",
                )),
            }
        }
        None => {
            // auth header not present => anonymous user
            tracing::debug!("Using ANONYMOUS user (no 'authorization' header)");
            Ok(User::AnonymousUser(AnonymousUser::new()))
        }
    }
}

/// This function verifies the session token and returns either authorized OR anonymous user.
async fn resolve_user_from_session_token(
    pool: &arango::ConnectionPool,
    session_token: &str,
) -> User {
    let session_token_hash = derive_session_token_hash(session_token);
    match get_user_by_session_token_hash(pool, &session_token_hash).await {
        Ok(user) => User::SignedUser(SignedUser::from(user)),
        Err(error) => {
            tracing::error!("{}", error);
            User::AnonymousUser(AnonymousUser::new())
        }
    }
}

#[cfg(test)]
mod tests {
    use crate::arango::get_database_connection_pool_mock;

    use super::*;

    #[tokio::test]
    async fn get_current_user_without_authorization_header() {
        let pool = get_database_connection_pool_mock();
        assert!(matches!(
            get_current_user(&pool, &None).await.unwrap(),
            User::AnonymousUser { .. }
        ));
    }

    #[tokio::test]
    async fn get_current_user_with_empty_authorization_header() {
        let pool = get_database_connection_pool_mock();
        insta::assert_snapshot!(
            get_current_user(&pool, &Some(String::from("")))
            .await
            .err()
            .unwrap(),
             @"Unable to parse 'authorization' header (should be 'Bearer XYZ')."
        );
    }

    #[tokio::test]
    async fn get_current_user_with_unparseable_authorization_header() {
        let pool = get_database_connection_pool_mock();
        insta::assert_snapshot!(
            get_current_user(&pool, &Some(String::from("XYZ")))
            .await
            .err()
            .unwrap(),
             @"Unable to parse 'authorization' header (should be 'Bearer XYZ')."
        );
    }
}
