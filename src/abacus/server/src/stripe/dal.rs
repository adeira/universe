use crate::arango::{resolve_aql, ConnectionPool, Document};
use crate::stripe::webhook::StripeWebhookPayload;

pub(in crate) async fn record_webhook_call(
    pool: &ConnectionPool,
    stripe_webhook_payload: &StripeWebhookPayload,
) -> anyhow::Result<Document<StripeWebhookPayload>> {
    resolve_aql(
        pool,
        r#"
            INSERT {
              _key: @webhook_key,
              id: @webhook_key,
              api_version: @webhook_api_version,
              created: @webhook_created,
              type: @webhook_type,
              data: @webhook_data,
            } INTO webhook_events_stripe
            RETURN NEW
        "#,
        hashmap_json![
            "webhook_key" => stripe_webhook_payload.id,
            "webhook_api_version" => stripe_webhook_payload.api_version,
            "webhook_created" => stripe_webhook_payload.created,
            "webhook_type" => stripe_webhook_payload.r#type,
            "webhook_data" => stripe_webhook_payload.data,
        ],
    )
    .await
}
