#![allow(non_snake_case)]

use crate::arangodb::ConnectionPool;
use arangors::document::options::InsertOptions;
use arangors::ClientError;
use futures::future::BoxFuture;

mod utils;

mod v0__migrations_init;
mod v1__create_collection_users_sessions;
mod v2__create_document_user_anonymous;
mod v3__create_document_user_admin;
mod v4__create_collection_products;
mod v5__create_collection_images;

#[derive(serde::Serialize, serde::Deserialize)]
struct MigrationRecord {
    _key: String,
}

// This migrations should be written to be idempotent: not to fail when they are run repeatedly.
pub async fn migrate(pool: &ConnectionPool) {
    let db = pool.db().await;

    // https://users.rust-lang.org/t/error-distinct-uses-of-impl-trait-result-in-different-opaque-types/46862/2
    // https://users.rust-lang.org/t/how-to-handle-a-vector-of-async-function-pointers/39804
    // https://users.rust-lang.org/t/how-to-store-async-functions-in-a-vector/51630
    type MigrationFunction = fn(
        &arangors::Database<arangors::client::reqwest::ReqwestClient>,
    ) -> BoxFuture<'_, Result<(), ClientError>>;

    // TODO: hide behind some macro (?)
    let migrations: Vec<(&str, MigrationFunction)> = vec![
        ("v0__migrations_init", |db| {
            Box::pin(v0__migrations_init::migrate(&db))
        }),
        ("v1__create_collection_users_sessions", |db| {
            Box::pin(v1__create_collection_users_sessions::migrate(&db))
        }),
        ("v2__create_document_user_anonymous", |db| {
            Box::pin(v2__create_document_user_anonymous::migrate(&db))
        }),
        ("v3__create_document_user_admin", |db| {
            Box::pin(v3__create_document_user_admin::migrate(&db))
        }),
        ("v4__create_collection_products", |db| {
            Box::pin(v4__create_collection_products::migrate(&db))
        }),
        ("v5__create_collection_images", |db| {
            Box::pin(v5__create_collection_images::migrate(&db))
        }),
    ];

    log::info!("Checking pending database migrations");
    for (migration_name, migration) in &migrations {
        if let Ok(migrations) = db.collection("migrations").await {
            if migrations
                .document::<MigrationRecord>(migration_name)
                .await
                .is_ok()
            {
                // the migration was already applied before - skip
                continue;
            }
        }

        let migration_result = migration(&db).await;
        match migration_result {
            Ok(_) => {
                // migration was successful - let's remember it so we don't run it again later
                if let Ok(migrations) = db.collection("migrations").await {
                    let result_future = migrations.create_document(
                        MigrationRecord {
                            _key: migration_name.to_string(),
                        },
                        InsertOptions::builder().return_new(true).build(),
                    );
                    match result_future.await {
                        Ok(_) => log::info!("{} ✅", migration_name),
                        Err(e) => {
                            log::error!("{} ❌", migration_name);
                            panic!("{:?}", e)
                        }
                    }
                }
            }
            Err(e) => {
                log::error!("{} ❌", migration_name);
                panic!("{:?}", e)
            }
        }
    }
}
