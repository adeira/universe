use crate::arangodb::errors::ModelError;
use crate::auth::session::Session;
use crate::auth::users::AnyUser;

/// TODO(004) add integration tests
pub(crate) async fn find_session_by_user(
    pool: &crate::arangodb::ConnectionPool,
    user: &AnyUser,
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
pub(crate) async fn create_user_session(
    pool: &crate::arangodb::ConnectionPool,
    session_token_hash: &str,
    user: &AnyUser,
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
///
/// TODO(004) add integration tests
pub(crate) async fn delete_user_session(
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
