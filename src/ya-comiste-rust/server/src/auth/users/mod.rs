pub use crate::auth::users::anonymous_user::AnonymousUser;
pub use crate::auth::users::authorized_user::AuthorizedUser;
pub use crate::auth::users::unauthorized_user::UnauthorizedUser;

use crate::arangodb::errors::ModelError;
use crate::auth::google::Claims;

mod anonymous_user;
mod authorized_user;
mod unauthorized_user;

#[derive(Clone)]
pub enum User {
    AnonymousUser(AnonymousUser),
    AuthorizedUser(AuthorizedUser),
    UnauthorizedUser(UnauthorizedUser),
}

/// Returns unauthorized user based on Google Claims (`sub`) or `None` if such user couldn't be found.
/// TODO(004) add integration tests
pub async fn find_user_by_google_claims(
    pool: &crate::arangodb::ConnectionPool,
    subject: &str,
) -> Option<UnauthorizedUser> {
    let db = pool.db().await;

    // only `sub` identifies the user reliably, everything else might potentially change
    let aql = arangors::AqlQuery::builder()
        .query(
            r#"
            FOR user IN users
              FILTER user.google.sub == @sub
              LIMIT 1
              RETURN user
            "#,
        )
        .bind_var("sub", subject)
        .build();

    match db.aql_query::<UnauthorizedUser>(aql).await {
        Ok(result_vector) => match result_vector.first() {
            Some(result) => Some(result.to_owned()),
            None => None,
        },
        Err(_) => None, // TODO: log such DB error (?)
    }
}

/// TODO(004) add integration tests
pub async fn create_user_by_google_claims(
    pool: &crate::arangodb::ConnectionPool,
    claims: &Claims,
) -> Result<UnauthorizedUser, ModelError> {
    let db = pool.db().await;
    let claims_json = serde_json::to_value(&claims)?;

    // only `sub` identifies the user reliably, everything else might potentially change
    let aql = arangors::AqlQuery::builder()
        .query(
            r#"
            INSERT {
              type: "identified",
              google: @claims_json,
            } INTO users
            LET user = NEW
            RETURN {
              _id: user._id,
              _rev: user._rev,
              _key: user._key,
              google: user.google,
            }
            "#,
        )
        .bind_var("claims_json", claims_json)
        .build();

    let users_vector = db.aql_query::<UnauthorizedUser>(aql).await?;
    match users_vector.first() {
        Some(user) => Ok(user.to_owned()),
        None => Err(ModelError::LogicError(format!(
            "unable to create user {}",
            &claims.subject()
        ))),
    }
}

/// It either updates the existing sessions (last access time) or returns an error if the session
/// doesn't exist (so the user is not logged in).
/// TODO(004) add integration tests
pub async fn get_user_by_session_token(
    pool: &crate::arangodb::ConnectionPool,
    session_token: &str,
) -> Result<AuthorizedUser, ModelError> {
    let db = pool.db().await;

    let aql = arangors::AqlQuery::builder()
        .query(
            r#"
            LET session_key = @session_token
            LET session_id = CONCAT_SEPARATOR('/', 'sessions', session_key)

            FOR vertex IN 1..1 INBOUND session_id GRAPH 'sessions'

            LET session = FIRST(
              UPDATE session_key
              WITH { last_access: DATE_ISO8601(DATE_NOW()) } IN sessions
              RETURN OLD
            )

            RETURN MERGE(vertex, {
              session_token: session._key,
            })
            "#,
        )
        .bind_var("session_token", session_token)
        .build();

    let users_vector = db.aql_query::<AuthorizedUser>(aql).await?;
    match users_vector.first() {
        Some(user) => Ok(user.to_owned()),
        None => Err(ModelError::LogicError(String::from(
            "unable to fetch the user", // so the user is not signed in since we are fetching by session
        ))),
    }
}
