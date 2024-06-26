use clap::{Arg, Command, ValueHint};

pub fn generate_clap_app() -> Command {
    clap::command!()
        .arg(
            Arg::new("arangodb-url")
                .long("arangodb-url")
                .env("ARANGODB_URL")
                .num_args(1)
                .value_hint(ValueHint::Url),
        )
        .arg(
            Arg::new("arangodb-database")
                .long("arangodb-database")
                .env("ARANGODB_DATABASE")
                .num_args(1)
        )
        .arg(
            Arg::new("arangodb-username")
                .long("arangodb-username")
                .env("ARANGODB_USERNAME")
                .num_args(1)
        )
        .arg(
            Arg::new("arangodb-password")
                .long("arangodb-password")
                .env("ARANGODB_PASSWORD")
                .num_args(1)
        )
        .arg(
            Arg::new("stripe-restricted-api-key")
                .long("stripe-restricted-api-key")
                .env("STRIPE_RESTRICTED_API_KEY")
                .help("Restricted Stripe.com API key (prefixed by 'rk_*')")
                .long_help(
                    "Restricted Stripe.com API key (prefixed by 'rk_*') to be used when calling \
                    Stripe.com APIs. Secret API key should never be used directly in this application. \
                    More information: https://stripe.com/docs/keys#limit-access",
                )
                .num_args(1),
        )
        .arg(
            Arg::new("stripe-webhook-secret")
                .long("stripe-webhook-secret")
                .env("STRIPE_WEBHOOK_SECRET")
                .help("Secret key for webhooks verification (prefixed by 'whsec_*').")
                .long_help(
                    "Stripe generates a unique secret key for each webhooks endpoint. It is being \
                    used for verifying the webhook payload signature to make sure that only \
                    Stripe.com can send these payloads.",
                )
                .num_args(1),
        ).subcommand(
            Command::new("generate-cli-completions")
                .override_help("Generate CLI completions for specified shells.")
                .arg(
                    Arg::new("shell")
                        .long("shell")
                        .num_args(1)
                        .value_parser(["bash", "zsh"])
                        .required(true)
                )
        )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn generated_clap_usage_test_long_help() {
        insta::with_settings!({snapshot_path => "__snapshots__"}, {
            insta::assert_snapshot!(generate_clap_app().render_long_help().to_string())
        });
    }

    #[test]
    fn generated_clap_usage_test_short_help() {
        insta::with_settings!({snapshot_path => "__snapshots__"}, {
            insta::assert_snapshot!(generate_clap_app().render_help().to_string())
        });
    }
}
