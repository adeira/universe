use crate::auth::rbac;
use crate::auth::rbac::Actions::Email;
use crate::auth::rbac::EmailActions::SendEmail;
use crate::graphql_context::Context;
use lettre::{
    message::{header, SinglePart},
    Message,
};
use rusoto_ses::{RawMessage, SendRawEmailRequest, Ses, SesClient};

pub(crate) async fn send_email(context: &Context) -> anyhow::Result<()> {
    rbac::verify_permissions(&context.user, &Email(SendEmail)).await?;

    // We are sending emails from US West - Oregon (`us-west-2`) because it allows us to receive
    // responses there:
    let ses_client = SesClient::new(rusoto_core::Region::UsWest2);

    // TODO: update for production values
    // TODO: translations
    let from = "KOCHKA Café <no-reply@kochka.com.mx>";
    let to = "Martin Zlámal <mrtnzlml+amazonses@gmail.com>";
    let subject = "Your KOCHKA Café order #000"; // TODO

    // TODO: drop MJML templates (hard to translate and generate dynamically)
    let html = include_str!("mjml_templates/__generated__/order-received.html");

    let email = Message::builder()
        .from(from.parse()?)
        .to(to.parse()?)
        .subject(subject)
        .singlepart(
            SinglePart::builder()
                .header(header::ContentType::TEXT_HTML) // TODO: multipart with TEXT_PLAIN (?)
                .body(String::from(html)),
        )?;

    let raw_email = email.formatted();
    let ses_request = SendRawEmailRequest {
        raw_message: RawMessage {
            data: base64::encode(raw_email).into(),
        },
        ..Default::default()
    };

    ses_client.send_raw_email(ses_request).await?;

    Ok(())
}
