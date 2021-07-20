use crate::arangodb::Database;
use crate::arangors::collection::options::{CreateOptions, CreateParameters};
use crate::arangors::collection::CollectionType;
use crate::arangors::document::options::InsertOptions;
use crate::arangors::graph::Graph;
use crate::arangors::index::Index;
use crate::arangors::view::ViewOptions;
use serde::de::DeserializeOwned;
use serde::Serialize;
use std::fmt::Debug;

pub(in crate::migrations) trait ArangoDocument {
    /// This key makes sure we don't create the same document twice by accident
    /// when running the migrations repeatedly.
    fn idempotency_key(&self) -> &str;
}

pub(in crate::migrations) async fn create_collection(
    db: &Database,
    collection_name: &str,
    collection_type: &CollectionType,
    json_schema: &Option<serde_json::Value>,
) -> anyhow::Result<()> {
    match db.collection(collection_name).await {
        Ok(_) => {
            // collection already exists, nothing to do
            Ok(())
        }
        Err(_) => {
            // collection doesn't exist yet, let's create it
            let create_options = match json_schema {
                Some(json_schema) => CreateOptions::builder()
                    .name(collection_name)
                    .collection_type(*collection_type)
                    .schema(json_schema.to_owned())
                    .build(),
                None => CreateOptions::builder()
                    .name(collection_name)
                    .collection_type(*collection_type)
                    .build(),
            };
            let result = db
                .create_collection_with_options(create_options, CreateParameters::default())
                .await;

            match result {
                Ok(_) => Ok(()),
                Err(e) => anyhow::bail!(e),
            }
        }
    }
}

pub(in crate::migrations) async fn create_document<T>(
    db: &Database,
    collection_name: &str,
    document: T,
) -> anyhow::Result<()>
where
    T: Serialize + DeserializeOwned + ArangoDocument,
{
    let collection = db.collection(&collection_name).await.unwrap(); // TODO
    match collection.document::<T>(document.idempotency_key()).await {
        Ok(_) => {
            // user already exists
            Ok(())
        }
        Err(_) => {
            // user doesn't exist yet, let's create it
            let result = collection
                .create_document(document, InsertOptions::builder().return_new(true).build())
                .await;

            match result {
                Ok(_) => Ok(()),
                Err(e) => anyhow::bail!(e),
            }
        }
    }
}

pub(in crate::migrations) async fn create_index(
    db: &Database,
    collection_name: &str,
    index: &Index,
) -> anyhow::Result<()> {
    match db.create_index(collection_name, &index).await {
        Ok(_) => Ok(()),
        Err(e) => anyhow::bail!(e),
    }
}

pub(in crate::migrations) async fn create_graph(db: &Database, graph: Graph) -> anyhow::Result<()> {
    match db.graph(&*graph.name).await {
        Ok(_) => {
            // graph already exists
            Ok(())
        }
        Err(_) => {
            // graph doesn't exist yet, let's create it
            match db.create_graph(graph, true).await {
                Ok(_) => Ok(()),
                Err(e) => anyhow::bail!(e),
            }
        }
    }
}

pub(in crate::migrations) async fn create_graph_vertex<T>(
    db: &Database,
    graph: &str,
    collection: &str,
    vertex: &T,
) -> anyhow::Result<()>
where
    T: Serialize,
{
    match db
        .create_graph_vertex(&graph, &collection, &vertex, true)
        .await
    {
        Ok(_) => Ok(()),
        Err(e) => anyhow::bail!(e),
    }
}

pub(in crate::migrations) async fn create_view(
    db: &Database,
    view_name: &str,
    view: ViewOptions,
) -> anyhow::Result<()> {
    match db.view(&view_name).await {
        Ok(_) => {
            // view already exists
            Ok(())
        }
        Err(_) => {
            // view doesn't exist yet, let's create it
            match db.create_view(view).await {
                Ok(_) => Ok(()),
                Err(e) => anyhow::bail!(e),
            }
        }
    }
}
