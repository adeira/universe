#![allow(non_snake_case)]

use crate::arango::document::options::InsertOptions;
use crate::arango::{ConnectionPool, DatabaseType};
use futures::future::BoxFuture;

mod utils;

mod v0__migrations_init;
mod v10__create_collection_archive;
mod v11__create_collection_orders;
mod v1__create_collection_users_sessions;
mod v2__create_document_user_anonymous;
mod v3__create_document_user_admin;
mod v4__create_collection_products;
mod v5__analytics_redirects;
mod v6__create_collection_tracking;
mod v7__create_collection_pos_checkouts;
mod v8__create_collection_product_addons;
mod v9__create_collection_products_categories;

#[derive(serde::Serialize, serde::Deserialize)]
struct MigrationRecord {
    _key: String,
}

/// All migrations should be written to be idempotent: not to fail when they are run repeatedly.
/// Please note: the migration engine currently doesn't care about the order or anything (it's quite naive).
pub async fn migrate(pool: &ConnectionPool) {
    let db = pool.db().await;

    // https://users.rust-lang.org/t/error-distinct-uses-of-impl-trait-result-in-different-opaque-types/46862/2
    // https://users.rust-lang.org/t/how-to-handle-a-vector-of-async-function-pointers/39804
    // https://users.rust-lang.org/t/how-to-store-async-functions-in-a-vector/51630
    type MigrationFunction = fn(&DatabaseType) -> BoxFuture<'_, anyhow::Result<()>>;

    // TODO: hide behind some macro (?)
    let migrations: Vec<(&str, MigrationFunction)> = vec![
        ("v0__migrations_init", |db| {
            Box::pin(v0__migrations_init::migrate(db))
        }),
        ("v1__create_collection_users_sessions", |db| {
            Box::pin(v1__create_collection_users_sessions::migrate(db))
        }),
        ("v2__create_document_user_anonymous", |db| {
            Box::pin(v2__create_document_user_anonymous::migrate(db))
        }),
        ("v3__create_document_user_admin", |db| {
            Box::pin(v3__create_document_user_admin::migrate(db))
        }),
        ("v4__create_collection_products", |db| {
            Box::pin(v4__create_collection_products::migrate(db))
        }),
        ("v5__analytics_redirects", |db| {
            Box::pin(v5__analytics_redirects::migrate(db))
        }),
        ("v6__create_collection_tracking", |db| {
            Box::pin(v6__create_collection_tracking::migrate(db))
        }),
        ("v7__create_collection_pos_checkouts", |db| {
            Box::pin(v7__create_collection_pos_checkouts::migrate(db))
        }),
        ("v8__create_collection_product_addons", |db| {
            Box::pin(v8__create_collection_product_addons::migrate(db))
        }),
        ("v9__create_collection_products_categories", |db| {
            Box::pin(v9__create_collection_products_categories::migrate(db))
        }),
        ("v10__create_collection_archive", |db| {
            Box::pin(v10__create_collection_archive::migrate(db))
        }),
        ("v11__create_collection_orders", |db| {
            Box::pin(v11__create_collection_orders::migrate(db))
        }),
    ];

    tracing::info!("Checking pending database migrations");
    for (migration_name, migration) in &migrations {
        if let Ok(migrations) = db.collection("migrations").await {
            if migrations
                .document::<MigrationRecord>(migration_name)
                .await
                .is_ok()
            {
                // the migration was already applied before - skip
                tracing::info!("✅ {} [SKIP - already applied]", migration_name);
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
                        Ok(_) => {
                            tracing::info!("✅ {} [OK - applied successfully]", migration_name)
                        }
                        Err(e) => {
                            tracing::error!("❌ {}", migration_name);
                            panic!("{:?}", e)
                        }
                    }
                }
            }
            Err(e) => {
                tracing::error!("❌ {}", migration_name);
                panic!("{:?}", e)
            }
        }
    }
    tracing::info!("Migrations OK");
}
