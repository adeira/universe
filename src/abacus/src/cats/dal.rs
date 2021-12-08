use crate::arango::{resolve_aql_vector, ConnectionPool};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct CatInfo {
    _id: String,
    _key: String,
    name: String,
    description: String,
}

#[juniper::graphql_object]
impl CatInfo {
    fn id(&self) -> juniper::ID {
        juniper::ID::from(self._id.to_owned())
    }

    fn name(&self) -> String {
        self.name.to_owned()
    }

    fn description(&self) -> String {
        self.description.to_owned()
    }
}

pub(in crate::cats) async fn list_all_cats(pool: &ConnectionPool) -> anyhow::Result<Vec<CatInfo>> {
    resolve_aql_vector(
        pool,
        r#"
          FOR cat IN cats
            SORT cat.order ASC
            RETURN cat
        "#,
        hashmap_json![],
    )
    .await
}
