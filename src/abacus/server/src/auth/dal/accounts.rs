use crate::arango::{resolve_aql, resolve_aql_vector, Document};
use crate::auth::account::Account;
use crate::auth::users::AnyUser;

pub(crate) async fn find_user_accounts(
    pool: &crate::arango::ConnectionPool,
    user: &AnyUser,
) -> anyhow::Result<Vec<Document<Account>>> {
    resolve_aql_vector(
        pool,
        r#"
            FOR account IN 1 OUTBOUND @user_id
                GRAPH "users_in_accounts"
                RETURN account
        "#,
        hashmap_json![
            "user_id" => user.id()
        ],
    )
    .await
}

pub(crate) async fn create_new_account(
    pool: &crate::arango::ConnectionPool,
    user: &AnyUser,
) -> anyhow::Result<Document<Account>> {
    resolve_aql(
        pool,
        r#"
            LET new_account = FIRST(
                INSERT {
                  is_active: true,
                  name: "Unnamed Account"
                } INTO accounts
                RETURN NEW
            )

            INSERT {
              _from: @user_id,
              _to: new_account._id,
            } INTO user_accounts

            RETURN new_account
        "#,
        hashmap_json![
            "user_id" => user.id()
        ],
    )
    .await
}
