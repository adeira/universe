use arangors::index::{Index, IndexSettings};
use arangors::ClientError;

pub async fn migrate(
    db: &arangors::Database<arangors::client::reqwest::ReqwestClient>,
) -> Result<(), ClientError> {
    let index = Index::builder()
        .name("last_access_mobile_ttl_index") // required in migrations for idempotency
        .fields(vec!["last_access".to_string()])
        .settings(IndexSettings::Ttl {
            // Mobile session token is long-lived (one year = 365 * 24 * 60 * 60)
            expire_after: 31_536_000,
        })
        .build();

    match db.create_index("sessions", &index).await {
        Ok(_) => Ok(()),
        Err(e) => Err(e),
    }
}
