use serde::Deserialize;
use uuid::Uuid;

use crate::arango::{resolve_aql, resolve_aql_vector, ConnectionPool};
use crate::price::Price;

#[derive(Deserialize, Clone, juniper::GraphQLObject, Debug)]
pub(in crate::analytics) struct AnalyticsSoldProductInfo {
    product_id: String,
    product_name: String,
    product_units: i32,
}

#[derive(Deserialize)]
pub struct Redirect {
    _id: String,
    _key: String,
    redirects_to: String,
    description: String,
    hits: i32,
}

#[juniper::graphql_object]
impl Redirect {
    fn id(&self) -> juniper::ID {
        juniper::ID::from(self._id.to_owned())
    }

    /// UUID is the ID used for redirects, for example: https://…/redirect/:uuid
    fn uuid(&self) -> String {
        // Technically, we use the ArangoDB _key as a UUID but we don't want to expose this
        // implementation detail directly.
        self._key.to_owned()
    }

    pub(crate) fn redirects_to(&self) -> String {
        self.redirects_to.to_owned()
    }

    fn description(&self) -> String {
        self.description.to_owned()
    }

    fn hits(&self) -> i32 {
        self.hits.to_owned()
    }
}

/// This function tries to find a link in the database based on the specified identifier and
/// returns it. Additionally, it records a "hit" which is basically of counter of the requests.
pub(in crate::analytics) async fn get_link_and_record_hit(
    pool: &ConnectionPool,
    uuid: &Uuid,
) -> anyhow::Result<Redirect> {
    resolve_aql(
        pool,
        r#"
            LET redirect = DOCUMENT("analytics_redirects", @uuid)
            UPDATE redirect WITH { hits: redirect.hits + 1 } IN analytics_redirects
            RETURN NEW
        "#,
        hashmap_json![
            "uuid" => uuid.hyphenated().encode_lower(&mut Uuid::encode_buffer()),
        ],
    )
    .await
}

pub(in crate::analytics) async fn get_redirect_hits(
    pool: &ConnectionPool,
) -> anyhow::Result<Vec<Redirect>> {
    resolve_aql_vector(
        pool,
        r#"
            FOR redirect IN analytics_redirects
              SORT redirect.hits DESC
              RETURN redirect
        "#,
        hashmap_json![],
    )
    .await
}
