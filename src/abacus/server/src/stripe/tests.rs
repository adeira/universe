use crate::stripe::webhook::{StripeWebhookPayload, StripeWebhookType};
use crate::stripe::CheckoutSession;

// Tests parsing of webhook event type `checkout.session.completed` in "payment" mode.
#[test]
fn test_checkout_session_parsing_mode_payment() {
    let webhook_payload = serde_json::from_str::<StripeWebhookPayload>(include_str!(
        "fixtures/checkout.session.completed/mode_payment.json"
    ))
    .unwrap();

    assert!(matches!(
        webhook_payload.r#type,
        StripeWebhookType::CheckoutSessionCompleted { .. }
    ));

    assert_eq!(
        serde_json::from_value::<CheckoutSession>(webhook_payload.data.object).is_ok(),
        true
    );
}

// Tests parsing of webhook event type `checkout.session.completed` in "subscription" mode.
#[test]
fn test_checkout_session_completed_mode_subscription() {
    let webhook_payload = serde_json::from_str::<StripeWebhookPayload>(include_str!(
        "fixtures/checkout.session.completed/mode_subscription.json"
    ))
    .unwrap();

    assert!(matches!(
        webhook_payload.r#type,
        StripeWebhookType::CheckoutSessionCompleted { .. }
    ));

    assert_eq!(
        serde_json::from_value::<CheckoutSession>(webhook_payload.data.object).is_ok(),
        true
    );
}

#[test]
fn test_invoice_paid() {
    let webhook_payload =
        serde_json::from_str::<StripeWebhookPayload>(include_str!("fixtures/invoice.paid.json"))
            .unwrap();

    assert!(matches!(
        webhook_payload.r#type,
        StripeWebhookType::InvoicePaid { .. }
    ));
}

#[test]
fn test_payment_intent_requires_action() {
    let webhook_payload = serde_json::from_str::<StripeWebhookPayload>(include_str!(
        "fixtures/payment_intent.requires_action.json"
    ))
    .unwrap();

    assert!(matches!(
        webhook_payload.r#type,
        StripeWebhookType::PaymentIntentRequiresAction { .. }
    ));
}
