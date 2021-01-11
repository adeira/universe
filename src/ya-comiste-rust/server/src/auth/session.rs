use crate::arangodb::errors::ModelError;
use crate::auth::users::UnauthorizedUser;
use rand::Rng;
use serde::Deserialize;

/// Generates sessions token which is compatible with RFC6750 - "Authorization Framework: Bearer
/// Token Usage" syntax (https://tools.ietf.org/html/rfc6750).
///
/// Session OWASP recommended requirements:
///
/// 1. Session ID Length (the session ID length must be at least 128 bits (16 bytes))
/// 2. Session ID Entropy (?)
/// 3. Session ID Content (must be meaningless to prevent information disclosure attacks)
/// 4. Session ID must be unique
///
/// See: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#session-id-properties
///
/// Hashed version of this session token can (and should) be used as a collection key in the DB.
/// See: https://www.arangodb.com/docs/stable/data-modeling-naming-conventions-document-keys.html
///
/// Raw session token version complies with RFC6750 so it can be used as a Bearer token, see:
/// https://tools.ietf.org/html/rfc6750#section-2.1 (https://tools.ietf.org/html/rfc5234)
pub(crate) fn generate_session_token() -> String {
    const CHARSET: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~+/";

    let mut rng = rand::thread_rng();
    let session_token: String = (0..128)
        .map(|_| {
            let idx = rng.gen_range(0..CHARSET.len());
            CHARSET[idx] as char
        })
        .collect();

    session_token
}

/// Derives hash of the session token which can be securely saved in the database.
///
/// Note: we currently do not salt the tokens per user since we expect that every generated
/// session/hash will be unique. This is a strong requirement since the session token uniquely
/// identifies the user. The salt below is just to be future proof in case we change our mind with
/// the salting (and to salt the DB).
pub(crate) fn derive_session_token_hash(session_token: &str) -> String {
    // We are not using PBKDF2-like derivation functions on purpose here. The reasoning is that our
    // session token has high enough entropy and we need to have this derivation as fast as possible
    // since it's being called with every API request (to fetch and verify the user per request).
    // See: https://security.stackexchange.com/q/151257

    // Database-unique component so that an attacker cannot crack the same session_token across
    // databases. This value was generated from a secure PRNG.
    // See: https://briansmith.org/rustdoc/ring/pbkdf2/index.html#password-database-example
    let db_salt_component = "32fd09c7-82d2-47c5-8fe4-81a526d3996d";

    let hash = ring::digest::digest(
        &ring::digest::SHA256,
        format!("{}{}", db_salt_component, session_token).as_bytes(),
    );

    // https://rust-lang-nursery.github.io/rust-cookbook/cryptography/encryption.html
    data_encoding::HEXLOWER.encode(&hash.as_ref())
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
    pool: &crate::arangodb::ConnectionPool,
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
    pool: &crate::arangodb::ConnectionPool,
    session_token_hash: &str,
    user: &UnauthorizedUser,
) -> Result<Session, ModelError> {
    let db = pool.db().await;

    // we first create a sessions and then create a session edge (how to do it better (?))
    let aql = arangors::AqlQuery::builder()
        .query(
            r#"
            LET new_session = FIRST(
              INSERT {
                _key: @session_token_hash,
                last_access: DATE_ISO8601(DATE_NOW()),
              } INTO sessions
              OPTIONS {
                overwrite: true,
                overwriteMode: "update",
                waitForSync: true,
              }
              RETURN NEW
            )

            LET session_id = CONCAT_SEPARATOR('/', 'sessions', @session_token_hash)
            INSERT {
              _key: @session_token_hash,
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
        .bind_var("session_token_hash", session_token_hash)
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
    pool: &crate::arangodb::ConnectionPool,
    session_token_hash: &str,
) -> Result<Session, ModelError> {
    let db = pool.db().await;

    let remove_sessions_aql = arangors::AqlQuery::builder()
        .query(
            r#"
            LET session_id = CONCAT_SEPARATOR('/', 'sessions', @session_token_hash)
            LET r = (
              FOR v,e,p IN 1..1 INBOUND session_id GRAPH 'sessions'
              REMOVE e IN user_sessions
            )
            REMOVE @session_token_hash IN sessions
            RETURN OLD
            "#,
        )
        .bind_var("session_token_hash", session_token_hash)
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
        let mut previous_token = String::from("");
        for _ in 0..1000 {
            let new_token = generate_session_token();
            assert_eq!(new_token.len(), 128);
            assert_ne!(new_token, previous_token);
            previous_token = new_token;
            assert_eq!(previous_token.len(), 128);
        }
    }

    #[test]
    fn derive_session_token_hash_test() {
        let mut previous_hash = String::from("");
        for _ in 0..1000 {
            let new_hash = derive_session_token_hash(&*generate_session_token());
            assert_eq!(new_hash.len(), 64);
            assert_ne!(new_hash, previous_hash);
            previous_hash = new_hash;
            assert_eq!(previous_hash.len(), 64);
        }
    }
}
