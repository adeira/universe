use crate::arango::ConnectionPool;
use crate::stripe::CheckoutSession;

/// Processes `checkout.session.completed` webhook from Stripe.com.
///
/// Basically, it receives the payload and does the following:
///  - updates our `order` in the database with the new information
///  - send email to our customer in case the payment was successful
///  - send email to us about new order to be fulfilled
///
/// See: https://stripe.com/docs/payments/checkout/fulfill-orders#fulfill
pub(crate) async fn completed(pool: &ConnectionPool, data: &CheckoutSession) -> anyhow::Result<()> {
    // TODO: update our order in the database (careful with donations - not everything is an order)
    // TODO: send email to our customer
    // TODO: send email to us

    // [server/src/stripe/webhook_handlers/checkout_session.rs:17] &data = CheckoutSession {
    //     id: Some(
    //         "cs_test_a171PaJrYTDxKEefgP2Vk4mrcAlwzZuI8lA8912xjc5g4LJP9bb7ocPCMa",
    //     ),
    //     amount_total: Some(
    //         3000,
    //     ),
    //     amount_subtotal: Some(
    //         3000,
    //     ),
    //     currency: Some(
    //         Usd,
    //     ),
    //     success_url: "https://httpbin.org/post",
    //     cancel_url: "https://httpbin.org/post",
    //     mode: Payment,
    //     payment_method_types: [
    //         Card,
    //     ],
    //     payment_status: Some(
    //         Paid,
    //     ),
    //     line_items: None,
    //     locale: None,
    //     shipping_rates: None,
    //     shipping_address_collection: None,
    //     url: None,
    // }
    dbg!(&data);

    Ok(())
}
