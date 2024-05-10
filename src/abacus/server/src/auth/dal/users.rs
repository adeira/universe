use crate::arango::{resolve_aql, resolve_aql_vector};
use crate::auth::google::Claims;
use crate::auth::users::AnyUser;

/// Returns all users except anonymous one - so almost all users (anonymous is not really a user
/// but rather a special case used in anonymous analytics/tracking for example).
pub(crate) async fn list_all_users(
    pool: &crate::arango::ConnectionPool,
) -> anyhow::Result<Vec<AnyUser>> {
    resolve_aql_vector(
        pool,
        r#"
            FOR user IN users
              FILTER user._id != "users/1" // hardcoded anonymous user
              RETURN user
        "#,
        hashmap_json![],
    )
    .await
}

/// Returns user based on Google Claims (`sub`) or `None` if such user couldn't be found.
pub(crate) async fn find_user_by_google_claims(
    pool: &crate::arango::ConnectionPool,
    subject: &str,
) -> Option<AnyUser> {
    let resolved = resolve_aql(
        pool,
        r#"
            FOR user IN users
              FILTER user._id != "users/1" // hardcoded anonymous user
              FILTER user.google.sub == @sub
              LIMIT 1
              RETURN user
        "#,
        hashmap_json![
            // only `sub` identifies the user reliably, everything else might potentially change
            "sub" => subject,
        ],
    )
    .await;

    match resolved {
        Ok(user) => Some(user),
        Err(e) => {
            tracing::error!("{}", e);
            None
        }
    }
}

/// Returns user by session token HASH. It also tries to updates the existing session (last access
/// time) or returns an error if the session doesn't exist (so the user is not logged in).
///
/// TODO(004) add integration tests
pub async fn get_user_by_session_token_hash(
    pool: &crate::arango::ConnectionPool,
    session_token_hash: &str,
) -> anyhow::Result<AnyUser> {
    resolve_aql(
        pool,
        r#"
            LET session_key = @session_token_hash
            LET session_id = CONCAT_SEPARATOR('/', 'sessions', session_key)

            FOR user IN 1..1 INBOUND session_id GRAPH 'sessions'

            LET session = FIRST(
              UPDATE session_key
              WITH { last_access: DATE_ISO8601(DATE_NOW()) } IN sessions
              OPTIONS {
                // The RocksDB engine does not require collection-level locks. Different write
                // operations on the same collection do not block each other, as long as there are
                // no "write-write" conflicts on the same documents. From an application development
                // perspective it can be desired to have exclusive write access on collections, to
                // simplify the development. Note that writes do not block reads in RocksDB.
                // Exclusive access can also speed up modification queries, because we avoid
                // conflict checks.
                //
                // This will use an exclusive lock on the collection and block other operations while
                // the update is going, thus preventing any "write-write" conflicts from happening.
                //
                // More info:
                //  - https://www.arangodb.com/docs/stable/aql/operations-update.html#query-options
                //  - https://github.com/arangodb/arangodb/issues/9702
                exclusive: true
              }
              RETURN OLD
            )

            RETURN user
        "#,
        hashmap_json![
            "session_token_hash" => session_token_hash,
        ],
    ).await
}

pub(crate) async fn create_inactive_user_by_google_claims(
    pool: &crate::arango::ConnectionPool,
    claims: &Claims,
) -> anyhow::Result<AnyUser> {
    resolve_aql(
        pool,
        r#"
            INSERT {
              is_active: false, // must be always FALSE first!
              google: @claims_json,
            } INTO users
            RETURN NEW
        "#,
        hashmap_json![
            "claims_json" => claims,
        ],
    )
    .await
}
