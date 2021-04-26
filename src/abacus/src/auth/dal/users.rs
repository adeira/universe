use crate::arangodb::errors::ModelError;
use crate::auth::google::Claims;
use crate::auth::users::AnyUser;

/// TODO(004) add integration tests
pub(crate) async fn list_all_users(
    pool: &crate::arangodb::ConnectionPool,
) -> Result<Vec<AnyUser>, ModelError> {
    let db = pool.db().await;

    let aql = arangors::AqlQuery::builder()
        .query(
            r#"
            FOR user IN users
              RETURN user
            "#,
        )
        .build();

    Ok(db.aql_query::<AnyUser>(aql).await?)
}

/// Returns user based on Google Claims (`sub`) or `None` if such user couldn't be found.
pub(crate) async fn find_user_by_google_claims(
    pool: &crate::arangodb::ConnectionPool,
    subject: &str,
) -> Option<AnyUser> {
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

    match db.aql_query::<AnyUser>(aql).await {
        Ok(result_vector) => match result_vector.first() {
            Some(result) => Some(result.to_owned()),
            None => None,
        },
        Err(_) => None, // TODO: log such DB error (?)
    }
}

/// Returns user by session token HASH. It also tries to updates the existing session (last access
/// time) or returns an error if the session doesn't exist (so the user is not logged in).
///
/// TODO(004) add integration tests
pub async fn get_user_by_session_token_hash(
    pool: &crate::arangodb::ConnectionPool,
    session_token_hash: &str,
) -> Result<AnyUser, ModelError> {
    let db = pool.db().await;

    let aql = arangors::AqlQuery::builder()
        .query(
            r#"
            LET session_key = @session_token_hash
            LET session_id = CONCAT_SEPARATOR('/', 'sessions', session_key)

            FOR user IN 1..1 INBOUND session_id GRAPH 'sessions'

            LET session = FIRST(
              UPDATE session_key
              WITH { last_access: DATE_ISO8601(DATE_NOW()) } IN sessions
              RETURN OLD
            )

            RETURN user
            "#,
        )
        .bind_var("session_token_hash", session_token_hash)
        .build();

    let users_vector = db.aql_query::<AnyUser>(aql).await?;
    match users_vector.first() {
        Some(user) => Ok(user.to_owned()),
        None => Err(ModelError::LogicError(String::from(
            "unable to fetch the user", // so the user is not signed in since we are fetching by session
        ))),
    }
}

pub(crate) async fn create_user_by_google_claims(
    pool: &crate::arangodb::ConnectionPool,
    claims: &Claims,
) -> Result<AnyUser, ModelError> {
    let db = pool.db().await;
    let claims_json = serde_json::to_value(&claims)?;

    // only `sub` identifies the user reliably, everything else might potentially change
    let aql = arangors::AqlQuery::builder()
        .query(
            r#"
            INSERT {
              type: "regular",
              google: @claims_json,
            } INTO users
            RETURN NEW
            "#,
        )
        .bind_var("claims_json", claims_json)
        .build();

    let users_vector = db.aql_query::<AnyUser>(aql).await?;
    match users_vector.first() {
        Some(user) => Ok(user.to_owned()),
        None => Err(ModelError::LogicError(format!(
            "unable to create user {}",
            &claims.subject()
        ))),
    }
}

/// TODO(004) add integration tests
#[cfg(test)]
pub(crate) async fn delete_user_by_google_claims(
    pool: &crate::arangodb::ConnectionPool,
    subject: &str,
) -> Option<AnyUser> {
    let db = pool.db().await;

    // only `sub` identifies the user reliably, everything else might potentially change
    let aql = arangors::AqlQuery::builder()
        .query(
            r#"
            FOR user IN users
              FILTER user.google.sub == @sub
              LIMIT 1
              REMOVE { _key: user._key } IN users
              RETURN OLD
            "#,
        )
        .bind_var("sub", subject)
        .build();

    match db.aql_query::<AnyUser>(aql).await {
        Ok(result_vector) => match result_vector.first() {
            Some(result) => Some(result.to_owned()),
            None => None,
        },
        Err(_) => None, // TODO: log such DB error (?)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::arangodb::{cleanup_test_database, prepare_empty_test_database};
    use crate::auth::google::Claims;

    #[ignore]
    #[tokio::test]
    async fn create_regular_user_by_google_claims_test() {
        let db_name = "create_regular_user_by_google_claims_test";
        let pool = prepare_empty_test_database(&db_name).await;

        // 1) create a regular user
        let user = create_user_by_google_claims(&pool, &Claims::mock("sub:12345")).await;
        assert_eq!(user.is_ok(), true);

        // 2) try to find it and verify its values
        let user = find_user_by_google_claims(&pool, "sub:12345").await;
        assert_eq!(user.is_some(), true);
        assert_eq!(user.unwrap().r#type(), "regular");

        cleanup_test_database(&db_name).await;
    }

    #[ignore]
    #[tokio::test]
    async fn create_admin_user_by_google_claims_test() {
        let db_name = "create_admin_user_by_google_claims_test";
        let pool = prepare_empty_test_database(&db_name).await;

        // 1) create an admin user (this SUB must always exist)
        let user =
            create_user_by_google_claims(&pool, &Claims::mock("108269453578187886435")).await;
        assert_eq!(user.is_ok(), true);

        // 2) try to find it and verify its values
        let user = find_user_by_google_claims(&pool, "108269453578187886435").await;
        assert_eq!(user.is_some(), true);
        assert_eq!(user.unwrap().r#type(), "admin");

        cleanup_test_database(&db_name).await;
    }
}
