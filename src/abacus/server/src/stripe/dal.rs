use crate::arango::{resolve_aql, ConnectionPool, Document};
use crate::stripe::webhook::StripeWebhookPayload;

/// Records the complete Stripe webhook payload.
///
/// If a document with the specified `_key` value exists already, nothing will be done and no write
/// operation will be carried out. The insert operation will return success in this case.
///
/// `RETURN NEW` will only return the document in case it was inserted. In case the document already
/// existed, `RETURN NEW` will return `null` (TODO: change the implementation to always return?).
///
/// The aforementioned behavior is important in case Stripe sends the same event with the same event
/// ID twice (it happened before).
pub(crate) async fn record_webhook_call(
    pool: &ConnectionPool,
    stripe_webhook_payload: &StripeWebhookPayload,
) -> anyhow::Result<Option<Document<StripeWebhookPayload>>> {
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

#[cfg(test)]
mod tests {
    use super::*;
    use crate::arango::{cleanup_test_database, prepare_empty_test_database};
    use crate::stripe::webhook::{StripeWebhookPayloadData, StripeWebhookType};

    #[ignore]
    #[tokio::test]
    async fn test_multiple_insertion_of_the_same_webhook_event() {
        let db_name = "list_all_users_test";
        let pool = prepare_empty_test_database(db_name).await;
        let event_id = String::from("evt_1JharIIHqwQFdWEmyvc4vCsx");

        // Record first webhook event:
        let result_1 = record_webhook_call(
            &pool,
            &StripeWebhookPayload {
                id: event_id.clone(),
                api_version: "2020-08-27".to_string(),
                created: 1656195734,
                r#type: StripeWebhookType::AccountUpdated,
                data: StripeWebhookPayloadData {
                    object: Default::default(),
                },
            },
        )
        .await
        .unwrap();

        assert_eq!(result_1.unwrap().id, event_id);

        // Record second (identical) webhook event simulating re-send:
        let result_2 = record_webhook_call(
            &pool,
            &StripeWebhookPayload {
                id: event_id.clone(),
                api_version: "2020-08-27".to_string(),
                created: 1656195734,
                r#type: StripeWebhookType::AccountUpdated,
                data: StripeWebhookPayloadData {
                    object: Default::default(),
                },
            },
        )
        .await
        .unwrap();

        assert_eq!(result_2.is_none(), true); // second call doesn't return `None`

        cleanup_test_database(db_name).await;
    }
}
