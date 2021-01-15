use arangors::collection::options::{CreateOptions, CreateParameters};
use arangors::collection::CollectionType;
use arangors::document::options::InsertOptions;
use arangors::ClientError;
use serde::{Deserialize, Serialize};

pub(in crate::migrations) async fn create_collection(
    db: &arangors::Database<arangors::client::reqwest::ReqwestClient>,
    collection_name: &str,
    collection_type: &CollectionType,
    json_schema: &Option<serde_json::Value>,
) -> Result<(), ClientError> {
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
                Err(e) => Err(e),
            }
        }
    }
}

pub(in crate::migrations) async fn create_document<T: Serialize + for<'de> Deserialize<'de>>(
    db: &arangors::Database<arangors::client::reqwest::ReqwestClient>,
    collection_name: &str,
    document: T,
    document_key: &str, // TODO: how to do it better? (it's already in User struct)
) -> Result<(), ClientError> {
    let collection = db.collection(&collection_name).await.unwrap(); // TODO
    match collection.document::<T>(document_key).await {
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
                Err(e) => Err(e),
            }
        }
    }
}
