use crate::arango::{resolve_aql, ConnectionPool, Document};
use crate::stripe::webhook::StripeWebhookPayload;

/// Records the complete Stripe webhook payload.
///
/// If a document with the specified `_key` value exists already, nothing will be done and no write
/// operation will be carried out. The insert operation will return success in this case.
///
/// `RETURN NEW` will only return the document in case it was inserted. In case the document already
/// existed, `RETURN NEW` will return `null`.
///
/// The aforementioned behavior is important in case Stripe sends the same event with the same event
/// ID twice (it happened before).
pub(crate) async fn record_webhook_call(
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
            } INTO webhook_events_stripe OPTIONS { overwriteMode: "ignore" }
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
