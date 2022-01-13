use crate::arango::ConnectionPool;
use crate::auth::users::User;
use crate::commerce::api::Product;
use serde::Deserialize;
use serde_json::json;

#[derive(Deserialize)]
struct Tracking {
    _id: String,
}

/// This function should be called whenever user visits a publicly accessible product (from eshop
/// for example). It records this event for the future analysis and recommendations.
///
/// Notice that it purposefully doesn't fail but only logs the potential error. It's because we
/// don't want to interrupt the program flow just because of tracking failure.
///
/// TODO(004) add integration tests
pub(crate) async fn user_visited_product(pool: &ConnectionPool, user: &User, product: &Product) {
    let db = pool.db().await;
    let user_id = match &user {
        User::AnonymousUser(u) => u.id(),
        User::SignedUser(u) => u.id(),
    };
    let product_id = product.id();

    let aql = crate::arango::AqlQuery::builder()
        .query(
            r#"
            INSERT {
              _from: @user_id,
              _to: @product_id,
              created: DATE_ISO8601(DATE_NOW()),
              action: "VISITED"
            } INTO tracking
            RETURN NEW
            "#,
        )
        .bind_var("user_id", json!(&user_id))
        .bind_var("product_id", json!(&product_id));

    let tracking_vector = db.aql_query::<Tracking>(aql.build()).await;
    match tracking_vector {
        Ok(_) => {
            tracing::trace!("user {} visited product {}", user_id, product_id);
        }
        Err(_) => {
            tracing::error!(
                "unable to create tracking event: user {} visited product {}",
                user_id,
                product_id
            )
        }
    }
}
