use crate::arangodb::{resolve_aql, resolve_aql_vector};
use crate::auth::session::{Session, SessionType};
use crate::auth::users::AnyUser;

pub(crate) async fn find_session_by_user(
    pool: &crate::arangodb::ConnectionPool,
    user: &AnyUser,
) -> Option<Session> {
    let result_vector = resolve_aql_vector(
        &pool,
        r#"
            FOR vertex IN 1..1 OUTBOUND @user_id GRAPH sessions
            RETURN vertex
        "#,
        hashmap_json![
            "user_id" => user.id(),
        ],
    )
    .await;

    match result_vector {
        Ok(result_vector) => result_vector.into_iter().next(),
        Err(err) => {
            tracing::error!("{}", err);
            None
        }
    }
}

/// Creates a new user session and links it with the user.
pub(crate) async fn create_new_user_session(
    pool: &crate::arangodb::ConnectionPool,
    session_token_hash: &str,
    user: &AnyUser,
) -> anyhow::Result<Session> {
    // we first create a sessions and then create a session edge (how to do it better (?))
    resolve_aql(
        &pool,
        r#"
            LET new_session = FIRST(
              INSERT {
                _key: @session_token_hash,
                last_access: DATE_ISO8601(DATE_NOW()),
                type: @session_type,
              } INTO sessions
              RETURN NEW
            )

            INSERT {
              _key: @session_token_hash,
              _from: @user_id,
              _to: new_session._id,
            } INTO user_sessions

            RETURN new_session
        "#,
        hashmap_json![
            "session_token_hash" => session_token_hash,
            "session_type" => SessionType::WEBAPP, // TODO
            "user_id" => user.id()
        ],
    )
    .await
}

/// This function tries to remove the sessions token (if it exists) as well as related session edge
/// from the database. Removing the session effectively means "log out".
///
/// TODO(004) add integration tests
pub(crate) async fn delete_user_session(
    pool: &crate::arangodb::ConnectionPool,
    session_token_hash: &str,
) -> anyhow::Result<Session> {
    // TODO: do not remove mobile/webapp sessions if it's from a different source
    //       (webapp should not deauthorize mobile)

    resolve_aql(
        &pool,
        r#"
            LET session_id = CONCAT_SEPARATOR('/', 'sessions', @session_token_hash)
            LET r = (
              FOR v,e,p IN 1..1 INBOUND session_id GRAPH 'sessions'
              REMOVE e IN user_sessions
            )
            REMOVE @session_token_hash IN sessions
            RETURN OLD
        "#,
        hashmap_json![
            "session_token_hash" => session_token_hash,
        ],
    )
    .await
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::arangodb::{cleanup_test_database, prepare_empty_test_database};

    #[ignore]
    #[tokio::test]
    async fn create_new_user_session_test() {
        let db_name = "create_new_user_session_test";
        let pool = prepare_empty_test_database(&db_name).await;

        let test_user = AnyUser::mock(&None);

        // 1) create a new session for the test user
        let session =
            create_new_user_session(&pool, "d99278e7-8f98-482a-ab9e-df93c380546e", &test_user)
                .await;
        assert_eq!(session.is_ok(), true);

        // 2) try to fetch it an asset it
        let session = find_session_by_user(&pool, &test_user)
            .await
            .expect("could not find test session");
        assert_eq!(
            session.session_token_hash(),
            "d99278e7-8f98-482a-ab9e-df93c380546e"
        );
        assert_eq!(
            session.session_type().to_string(),
            "webapp" // TODO: the types are not properly implemented yet
        );

        cleanup_test_database(&db_name).await;
    }
}
