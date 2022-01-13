use serde::{Deserialize, Serialize};

/// See: https://stripe.com/docs/api/events/types
#[derive(Debug, Deserialize, Serialize)]
pub enum StripeWebhookType {
    #[serde(rename = "account.updated")]
    AccountUpdated,
    #[serde(rename = "balance.available")]
    BalanceAvailable,
    #[serde(rename = "charge.captured")]
    ChargeCaptured,
    #[serde(rename = "charge.dispute.created")]
    ChargeDisputeCreated,
    #[serde(rename = "charge.failed")]
    ChargeFailed,
    #[serde(rename = "charge.refunded")]
    ChargeRefunded,
    #[serde(rename = "charge.succeeded")]
    ChargeSucceeded,
    #[serde(rename = "checkout.session.async_payment_failed")]
    CheckoutSessionAsyncPaymentFailed,
    #[serde(rename = "checkout.session.async_payment_succeeded")]
    CheckoutSessionAsyncPaymentSucceeded,

    ///See: https://stripe.com/docs/api/checkout/sessions/object
    #[serde(rename = "checkout.session.completed")]
    CheckoutSessionCompleted,

    #[serde(rename = "customer.created")]
    CustomerCreated,
    #[serde(rename = "customer.deleted")]
    CustomerDeleted,
    #[serde(rename = "customer.source.created")]
    CustomerSourceCreated,
    #[serde(rename = "customer.source.updated")]
    CustomerSourceUpdated,
    #[serde(rename = "customer.subscription.created")]
    CustomerSubscriptionCreated,
    #[serde(rename = "customer.subscription.deleted")]
    CustomerSubscriptionDeleted,
    #[serde(rename = "customer.subscription.updated")]
    CustomerSubscriptionUpdated,
    #[serde(rename = "customer.updated")]
    CustomerUpdated,
    #[serde(rename = "invoice.created")]
    InvoiceCreated,
    #[serde(rename = "invoice.finalized")]
    InvoiceFinalized,
    #[serde(rename = "invoice.payment_action_required")]
    InvoicePaymentActionRequired,
    #[serde(rename = "invoice.payment_failed")]
    InvoicePaymentFailed,
    #[serde(rename = "invoice.payment_succeeded")]
    InvoicePaymentSucceeded,
    #[serde(rename = "invoice.updated")]
    InvoiceUpdated,
    #[serde(rename = "issuing_authorization.request")]
    IssuingAuthorizationRequest,
    #[serde(rename = "issuing_card.created")]
    IssuingCardCreated,
    #[serde(rename = "issuing_cardholder.created")]
    IssuingCardholderCreated,
    #[serde(rename = "payment_intent.amount_capturable_updated")]
    PaymentIntentAmountCapturableUpdated,
    #[serde(rename = "payment_intent.canceled")]
    PaymentIntentCanceled,
    #[serde(rename = "payment_intent.created")]
    PaymentIntentCreated,
    #[serde(rename = "payment_intent.payment_failed")]
    PaymentIntentPaymentFailed,
    #[serde(rename = "payment_intent.succeeded")]
    PaymentIntentSucceeded,
    #[serde(rename = "payment_method.attached")]
    PaymentMethodAttached,
    #[serde(rename = "payout.created")]
    PayoutCreated,
    #[serde(rename = "payout.updated")]
    PayoutUpdated,
    #[serde(rename = "plan.created")]
    PlanCreated,
    #[serde(rename = "plan.deleted")]
    PlanDeleted,
    #[serde(rename = "plan.updated")]
    PlanUpdated,
    #[serde(rename = "product.created")]
    ProductCreated,
    #[serde(rename = "product.deleted")]
    ProductDeleted,
    #[serde(rename = "product.updated")]
    ProductUpdated,
    #[serde(rename = "quote.accepted")]
    QuoteAccepted,
    #[serde(rename = "quote.canceled")]
    QuoteCanceled,
    #[serde(rename = "quote.created")]
    QuoteCreated,
    #[serde(rename = "quote.finalized")]
    QuoteFinalized,
    #[serde(rename = "setup_intent.canceled")]
    SetupIntentCanceled,
    #[serde(rename = "setup_intent.created")]
    SetupIntentCreated,
    #[serde(rename = "setup_intent.setup_failed")]
    SetupIntentSetupFailed,
    #[serde(rename = "setup_intent.succeeded")]
    SetupIntentSucceeded,
    #[serde(rename = "subscription_schedule.canceled")]
    SubscriptionScheduleCanceled,
    #[serde(rename = "subscription_schedule.created")]
    SubscriptionScheduleCreated,
    #[serde(rename = "subscription_schedule.released")]
    SubscriptionScheduleReleased,
    #[serde(rename = "subscription_schedule.updated")]
    SubscriptionScheduleUpdated,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct StripeWebhookPayloadData {
    /// Here we are exposing only raw untyped value and users have to convert it to the appropriate
    /// struct correctly. How to do it better?
    pub object: serde_json::Value,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct StripeWebhookPayload {
    pub id: String,          // example: "evt_1JharIIHqwQFdWEmyvc4vCsx"
    pub api_version: String, // example: "2020-08-27"
    pub r#type: StripeWebhookType,
    pub data: StripeWebhookPayloadData,
}

#[derive(Debug, PartialEq)]
struct StripeSignatureHeader {
    timestamp: String,
    signature: String,
}

pub(crate) fn verify_stripe_signature(
    stripe_signature_header: &str,
    stripe_webhook_payload_bytes: &bytes::Bytes,
    stripe_webhook_key: &str,
) -> anyhow::Result<()> {
    let parsed_header = parse_stripe_signature_header(stripe_signature_header)?;
    let payload_for_verification = format!(
        "{}.{}",
        parsed_header.timestamp,
        match std::str::from_utf8(stripe_webhook_payload_bytes) {
            Ok(stripe_webhook_payload) => stripe_webhook_payload,
            Err(_) => {
                let message = "Unable to parse Stripe webhook payload.";
                tracing::error!(message);
                anyhow::bail!(message)
            }
        }
    );

    let key = ring::hmac::Key::new(ring::hmac::HMAC_SHA256, stripe_webhook_key.as_bytes());
    match data_encoding::HEXLOWER.decode(parsed_header.signature.as_bytes()) {
        Ok(tag) => match ring::hmac::verify(&key, payload_for_verification.as_bytes(), &tag) {
            Ok(_) => Ok(()),
            Err(_) => {
                let message = "Invalid Stripe webhook signature!";
                tracing::error!(message);
                anyhow::bail!(message)
            }
        },
        Err(_) => {
            let message = "Unable to decode Stripe signature. Is it a valid hexadecimal string?";
            tracing::error!(message);
            anyhow::bail!(message)
        }
    }
}

fn parse_stripe_signature_header(header: &str) -> anyhow::Result<StripeSignatureHeader> {
    if header.is_empty() {
        anyhow::bail!("empty Stripe-Signature header string");
    }

    let stripe_signature_header = match std::str::from_utf8(header.as_bytes()) {
        Ok(stripe_signature_header) => stripe_signature_header,
        Err(_) => anyhow::bail!("unable to parse the Stripe-Signature header string"),
    };

    // 1) split the header by ","
    // 2) split each part by "="
    // 3) resulting "t" is a timestamp and "v1" is a signature
    let mut timestamp = None;
    let mut signature = None;
    let header_chunks = stripe_signature_header.split(',').collect::<Vec<&str>>();
    for header_chunk in header_chunks {
        let mut split = header_chunk.split('=');
        match split.next() {
            Some("t") => timestamp = split.next().map(String::from),
            Some("v1") => signature = split.next().map(String::from),
            Some(_) => {}
            None => {}
        }
    }

    if timestamp.is_none() {
        anyhow::bail!("cannot find timestamp in the Stripe-Signature header")
    }

    if signature.is_none() {
        anyhow::bail!("cannot find signature in the Stripe-Signature header")
    }

    Ok(StripeSignatureHeader {
        timestamp: timestamp.unwrap(),
        signature: signature.unwrap(),
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_stripe_signature_header_test() {
        // The following header was returned by Stripe CLI while testing so it should be fine to
        // use it here publicly:
        let test_header = "t=1633533053,v1=4249f311ecf912838f32b4f438bab9f46fb80cddc678560dd1fb92df9923ecdf,v0=bb9a03d44402f72c37401ebdcb03a7b4a2db4f6f62ccc3b73a2cb9e2f4894856";
        assert_eq!(
            parse_stripe_signature_header(test_header).unwrap(),
            StripeSignatureHeader {
                timestamp: String::from("1633533053"),
                signature: String::from(
                    "4249f311ecf912838f32b4f438bab9f46fb80cddc678560dd1fb92df9923ecdf"
                )
            }
        );
    }

    #[test]
    fn parse_stripe_signature_header_test_invalid_timestamp() {
        assert_eq!(
            parse_stripe_signature_header("invalid_stripe_signature_header")
                .unwrap_err()
                .downcast::<&str>()
                .unwrap(),
            "cannot find timestamp in the Stripe-Signature header"
        );
    }

    #[test]
    fn parse_stripe_signature_header_test_invalid_signature() {
        assert_eq!(
            parse_stripe_signature_header("t=1633533053,invalid_stripe_signature_header")
                .unwrap_err()
                .downcast::<&str>()
                .unwrap(),
            "cannot find signature in the Stripe-Signature header"
        );
    }

    #[test]
    fn parse_stripe_signature_header_test_empty() {
        assert_eq!(
            parse_stripe_signature_header("")
                .unwrap_err()
                .downcast::<&str>()
                .unwrap(),
            "empty Stripe-Signature header string"
        );
    }

    #[test]
    fn verify_stripe_signature_test() {
        // The following header, payload and webhook key were returned by Stripe CLI while testing
        // so it should be fine to use them here publicly:
        let test_header = "t=1633562730,v1=cd8489d9779927ff59f38b09f3e9f7e5f87abd021fea49d4740b6b7ab566f8b1,v0=561f8c754bffb9bff6bd232d31b9a8fa1f77928dc1cabba56c5ea677248b2568";
        let test_payload = "{\n  \"id\": \"evt_1JhjUMIHqwQFdWEmWVv1TyIg\",\n  \"object\": \"event\",\n  \"api_version\": \"2020-08-27\",\n  \"created\": 1633562730,\n  \"data\": {\n    \"object\": {\n      \"id\": \"cs_test_a1iG2sC7hTQwCguzntTeyaCmMYnQY90An6wnP3AuVFQqtrZEhFWsapHwOI\",\n      \"object\": \"checkout.session\",\n      \"after_expiration\": null,\n      \"allow_promotion_codes\": null,\n      \"amount_subtotal\": 3000,\n      \"amount_total\": 3000,\n      \"automatic_tax\": {\n        \"enabled\": false,\n        \"status\": null\n      },\n      \"billing_address_collection\": null,\n      \"cancel_url\": \"https://httpbin.org/post\",\n      \"client_reference_id\": null,\n      \"consent\": null,\n      \"consent_collection\": null,\n      \"currency\": \"usd\",\n      \"customer\": \"cus_KMSPwYH59cmMKG\",\n      \"customer_details\": {\n        \"email\": \"stripe@example.com\",\n        \"tax_exempt\": \"none\",\n        \"tax_ids\": [\n\n        ]\n      },\n      \"customer_email\": null,\n      \"expires_at\": 1633649125,\n      \"livemode\": false,\n      \"locale\": null,\n      \"metadata\": {\n      },\n      \"mode\": \"payment\",\n      \"payment_intent\": \"pi_3JhjUHIHqwQFdWEm1LolEVbB\",\n      \"payment_method_options\": {\n      },\n      \"payment_method_types\": [\n        \"card\"\n      ],\n      \"payment_status\": \"paid\",\n      \"recovered_from\": null,\n      \"setup_intent\": null,\n      \"shipping\": null,\n      \"shipping_address_collection\": null,\n      \"submit_type\": null,\n      \"subscription\": null,\n      \"success_url\": \"https://httpbin.org/post\",\n      \"total_details\": {\n        \"amount_discount\": 0,\n        \"amount_shipping\": 0,\n        \"amount_tax\": 0\n      },\n      \"url\": null\n    }\n  },\n  \"livemode\": false,\n  \"pending_webhooks\": 2,\n  \"request\": {\n    \"id\": null,\n    \"idempotency_key\": null\n  },\n  \"type\": \"checkout.session.completed\"\n}";
        assert!(verify_stripe_signature(
            test_header,
            &bytes::Bytes::from(test_payload),
            "whsec_vy9gLGeT6M9u8qUvghHGW3Jkg1PwrZyd"
        )
        .is_ok());
    }

    #[test]
    fn verify_stripe_signature_invalid_test() {
        // The following header and payload was returned by Stripe CLI while testing so it should
        // be fine to use it here publicly:
        let test_header = "t=1633562730,v1=cd8489d9779927ff59f38b09f3e9f7e5f87abd021fea49d4740b6b7ab566f8b1,v0=561f8c754bffb9bff6bd232d31b9a8fa1f77928dc1cabba56c5ea677248b2568";
        let test_payload = "{\"invalid\":true}";
        assert_eq!(
            verify_stripe_signature(
                test_header,
                &bytes::Bytes::from(test_payload),
                "stripe_webhook_key_mock"
            )
            .unwrap_err()
            .downcast::<&str>()
            .unwrap(),
            "Invalid Stripe webhook signature!"
        );
    }
}
