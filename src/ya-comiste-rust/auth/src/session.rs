use crate::users::UnauthorizedUser;
use arangodb::errors::ModelError;
use rand::Rng;
use serde::Deserialize;

/// Generates sessions token which is compatible with ArangoDB `_key` expectations as well as with
/// RFC6750 - Authorization Framework: Bearer Token Usage syntax (https://tools.ietf.org/html/rfc6750).
///
/// Session OWASP recommended requirements:
///
/// 1. Session ID Length (the session ID length must be at least 128 bits (16 bytes))
/// 2. Session ID Content (must be meaningless to prevent information disclosure attacks)
///
/// See: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#session-id-properties
///
/// Conveniently, the charset used to generate the token follows ArangoDB conventions for `_key` so
/// the session ID can (and should) be used as a collection key. See: https://www.arangodb.com/docs/stable/data-modeling-naming-conventions-document-keys.html
///
/// On top of that, it also complies with RFC6750 so it can be used as a Bearer token, see:
/// https://tools.ietf.org/html/rfc6750#section-2.1 (https://tools.ietf.org/html/rfc5234)
///
/// So, essentially intersection of these 2 sets (special chars only):
/// "_" / "-" / ":" / "." / "@" / "(" / ")" / "+" / "," / "=" / ";" / "$" / "!" / "*" / "'" / "%"
/// "-" / "." / "_" / "~" / "+" / "/"
pub fn generate_session_token() -> String {
    const CHARSET: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-.+";

    let mut rng = rand::thread_rng();
    let session_token: String = (0..64)
        .map(|_| {
            let idx = rng.gen_range(0, CHARSET.len());
            CHARSET[idx] as char
        })
        .collect();

    session_token
}

#[derive(Clone, Deserialize)]
pub struct Session {
    _id: String,
    _rev: String,
    _key: String,
    last_access: String,
}

impl Session {
    pub fn id(&self) -> String {
        self._id.to_owned()
    }

    pub fn key(&self) -> String {
        self._key.to_owned()
    }
}

pub async fn find_session_by_user(
    pool: &arangodb::ConnectionPool,
    user: &UnauthorizedUser,
) -> Option<Session> {
    let db = pool.db().await;

    let aql = arangors::AqlQuery::builder()
        .query(
            r#"
            FOR vertex IN 1..1 OUTBOUND @user_id GRAPH sessions
            RETURN vertex
            "#,
        )
        .bind_var("user_id", user.id())
        .build();

    match db.aql_query::<Session>(aql).await {
        Ok(result_vector) => match result_vector.first() {
            Some(result) => Some(result.to_owned()),
            None => None,
        },
        Err(err) => {
            log::error!("{}", err);
            None
        }
    }
}

/// Creates a new user session and links it with the user. The session is updated if it already
/// exists (updates the last access time). This should not happen very often though since there is
/// no need to call "authorize" when the user is already authorized.
///
/// TODO(004) add integration tests
pub async fn create_user_session(
    pool: &arangodb::ConnectionPool,
    session_token: &str,
    user: &UnauthorizedUser,
) -> Result<Session, ModelError> {
    let db = pool.db().await;

    // we first create a sessions and then create a session edge (how to do it better (?))
    let aql = arangors::AqlQuery::builder()
        .query(
            r#"
            LET new_session = FIRST(
              INSERT {
                _key: @session_key,
                last_access: DATE_ISO8601(DATE_NOW()),
              } INTO sessions
              OPTIONS {
                overwrite: true,
                overwriteMode: "update",
                waitForSync: true,
              }
              RETURN NEW
            )

            LET session_id = CONCAT_SEPARATOR('/', 'sessions', @session_key)
            INSERT {
              _key: @session_key,
              _from: @user_id,
              _to: session_id,
            } INTO user_sessions
            OPTIONS {
              overwrite: true,
              overwriteMode: "update",
              waitForSync: true,
            }
            LET edge = NEW
            RETURN new_session
            "#,
        )
        .bind_var("session_key", session_token)
        .bind_var("user_id", user.id())
        .build();

    let session_vector = db.aql_query::<Session>(aql).await?;
    match session_vector.first() {
        Some(session) => Ok(session.to_owned()),
        None => Err(ModelError::LogicError(format!(
            "unable to create session for use ID {}",
            &user.id()
        ))),
    }
}

/// This function tries to remove the sessions token (if it exists) as well as related session edge
/// from the database. Removing the session effectively means "log out".
/// TODO(004) add integration tests
pub async fn delete_user_session(
    pool: &arangodb::ConnectionPool,
    session_token: &str,
) -> Result<Session, ModelError> {
    let db = pool.db().await;

    let remove_sessions_aql = arangors::AqlQuery::builder()
        .query(
            r#"
            LET session_id = CONCAT_SEPARATOR('/', 'sessions', @session_key)
            LET r = (
              FOR v,e,p IN 1..1 INBOUND session_id GRAPH 'sessions'
              REMOVE e IN user_sessions
            )
            REMOVE @session_key IN sessions
            RETURN OLD
            "#,
        )
        .bind_var("session_key", session_token)
        .build();

    let session_vector = db.aql_query::<Session>(remove_sessions_aql).await?;
    match session_vector.first() {
        Some(session) => Ok(session.to_owned()),
        None => Err(ModelError::LogicError(String::from(
            "unable to fetch old sessions",
        ))),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn generate_session_token_test() {
        assert_eq!(generate_session_token().len(), 64);
    }
}
