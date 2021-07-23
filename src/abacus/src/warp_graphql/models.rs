use crate::arangors::ConnectionPool;
use crate::auth::users::{AnonymousUser, User};
use crate::headers::parse_authorization_header;

/// Resolves a user from the authorization header value. It returns anonymous user
/// in case there is no authorization header. Otherwise, it tries to resolve the actual
/// user (or returns an error if auth header exists but user does not or if the header has
/// invalid format).
pub(in crate::warp_graphql) async fn get_current_user(
    pool: &ConnectionPool,
    authorization_header: &Option<String>,
) -> Result<User, String> {
    match authorization_header {
        Some(authorization_header) => {
            // auth header exists, let's try to parse it
            match parse_authorization_header(&authorization_header) {
                Ok(session_token) => {
                    // auth header successfully parsed (unverified)
                    match crate::auth::resolve_user_from_session_token(&pool, &session_token).await
                    {
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

#[cfg(test)]
mod tests {
    use super::*;
    use crate::arangors::get_database_connection_pool_mock;

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
