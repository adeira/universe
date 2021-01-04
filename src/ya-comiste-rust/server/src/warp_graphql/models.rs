use crate::arangodb::ConnectionPool;
use crate::auth::users::{AnonymousUser, User};

pub(in crate::warp_graphql) async fn get_current_user(
    pool: &ConnectionPool,
    session_token: &Option<String>,
) -> Result<User, ()> {
    match session_token {
        Some(session_token) => {
            match crate::auth::resolve_user_from_session_token(&pool, &session_token).await {
                User::AdminUser(user) => {
                    log::info!("Using admin user: {} 👍👍", user.id());
                    Ok(User::AdminUser(user))
                }
                User::AnonymousUser(_) => {
                    log::error!("Unmatched session token 🛑");
                    Err(())
                }
                User::AuthorizedUser(user) => {
                    log::info!("Using authorized user: {} 👍", user.id());
                    Ok(User::AuthorizedUser(user))
                }
            }
        }
        None => {
            log::info!("Using anonymous user (no 'authorization' header) 👍");
            Ok(User::AnonymousUser(AnonymousUser::new()))
        }
    }
}
