use crate::sdui_content::{SDUIComponentContent, SDUIContent};
use arangodb::errors::ModelError;
use auth::users::User;
use dataloader::non_cached::Loader;
use dataloader::BatchFn;
use std::collections::HashMap;

#[derive(Clone)]
pub struct ContentLoadFn {
    pool: arangodb::ConnectionPool,
    user: User,
}

#[async_trait::async_trait]
impl BatchFn<String, Option<SDUIContent>> for ContentLoadFn {
    async fn load(&mut self, component_ids: &[String]) -> HashMap<String, Option<SDUIContent>> {
        log::trace!("Loading component content for: {:?}", component_ids);
        let component_contents =
            get_component_contents(&self.user, &self.pool, component_ids.to_vec()).await;
        match component_contents {
            Ok(component_contents) => component_contents,
            // Alternatively, return errors (since the swallows DB errors)?
            // https://github.com/cksac/dataloader-rs/issues/19#issuecomment-627085893
            Err(_) => component_ids.iter().map(|k| (k.to_owned(), None)).collect(),
        }
    }
}

pub type ContentDataloaderType = Loader<String, Option<SDUIContent>, ContentLoadFn>;

pub fn get_content_dataloader(
    user: &User,
    pool: &arangodb::ConnectionPool,
) -> ContentDataloaderType {
    Loader::new(ContentLoadFn {
        pool: pool.to_owned(),
        user: user.to_owned(),
    })
    .with_yield_count(100)
}

/// It already returns Dataloader friendly output given the component IDs.
async fn get_component_contents(
    user: &User, // TODO: use the current user
    pool: &arangodb::ConnectionPool,
    component_ids: Vec<String>,
) -> Result<HashMap<String, Option<SDUIContent>>, ModelError> {
    let db = pool.db().await;

    let aql = arangors::AqlQuery::builder()
        .query(
            "
            WITH components, component_content, restaurants, shops
            FOR component_id IN @component_ids
              FOR vertex IN 1..1 OUTBOUND component_id GRAPH sdui_content
                RETURN {
                  component_id,
                  _serde_union_tag: PARSE_IDENTIFIER(vertex._id).collection,
                  _serde_union_content: vertex,
                }
            ",
        )
        .bind_var("component_ids", component_ids.clone())
        .build();

    let contents = db.aql_query::<SDUIComponentContent>(aql).await;

    // Dataloader constraints (see: https://github.com/graphql/dataloader):
    // - The Array of values must be the same length as the Array of keys.
    // - Each index in the Array of values must correspond to the same index in the Array of keys.
    match contents {
        Ok(c) => {
            let component_contents = c
                .into_iter()
                .map(|content| (content.component_id, Some(content.content_variant)))
                .collect();

            let dataloader_map = component_ids.into_iter().fold(
                component_contents,
                |mut map: HashMap<String, Option<SDUIContent>>, id| {
                    map.entry(id).or_insert(None);
                    map
                },
            );

            Ok(dataloader_map)
        }
        Err(e) => Err(ModelError::DatabaseError(e)),
    }
}
