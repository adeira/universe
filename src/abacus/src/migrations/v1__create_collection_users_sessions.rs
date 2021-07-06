use crate::migrations::utils::{create_collection, create_graph, create_index};
use arangors::collection::CollectionType;
use arangors::graph::{EdgeDefinition, Graph};
use arangors::index::{Index, IndexSettings};

pub async fn migrate(
    db: &arangors::Database<uclient::reqwest::ReqwestClient>,
) -> anyhow::Result<()> {
    // 1. create `users` table
    create_collection(
        &db,
        "users",
        &CollectionType::Document,
        &serde_json::from_str(std::include_str!("json_schemas/users.json")).unwrap(),
    )
    .await?;

    // 2. create `sessions` table
    create_collection(
        &db,
        "sessions",
        &CollectionType::Document,
        &serde_json::from_str(std::include_str!("json_schemas/sessions.json")).unwrap(),
    )
    .await?;

    // 3. create edge between `users` and `sessions`
    create_collection(&db, "user_sessions", &CollectionType::Edge, &None).await?;

    // 4. create TTL index for the sessions
    create_index(
        &db,
        "sessions",
        &Index::builder()
            .name("last_access_mobile_ttl_index") // required in migrations for idempotency
            .fields(vec!["last_access".to_string()])
            .settings(IndexSettings::Ttl {
                // Mobile session token is long-lived (one year = 365 * 24 * 60 * 60)
                expire_after: 31_536_000,
            })
            .build(),
    )
    .await?;

    // 5. create sessions graph
    create_graph(
        &db,
        Graph::builder()
            .name(String::from("sessions"))
            .edge_definitions(vec![EdgeDefinition {
                collection: String::from("user_sessions"),
                from: vec![String::from("users")],
                to: vec![String::from("sessions")],
            }])
            .build(),
    )
    .await
}
