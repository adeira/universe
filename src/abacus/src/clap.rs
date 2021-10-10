use clap::{App, Arg, ArgSettings, ValueHint};

pub fn generate_clap_app() -> App<'static> {
    clap::app_from_crate!()
        .arg(
            Arg::new("no-migrations")
                .long("no-migrations")
                .takes_value(false)
                .about("Skips database migrations"),
        )
        .arg(
            Arg::new("arangodb-url")
                .long("arangodb-url")
                .takes_value(true)
                .default_value("http://127.0.0.1:8529/")
                .value_hint(ValueHint::Url),
        )
        .arg(
            Arg::new("arangodb-database")
                .long("arangodb-database")
                .takes_value(true)
                .default_value("abacus"),
        )
        .arg(
            Arg::new("arangodb-username")
                .long("arangodb-username")
                .takes_value(true)
                .default_value("abacus"),
        )
        .arg(
            Arg::new("arangodb-password")
                .long("arangodb-password")
                .takes_value(true)
                .settings(&[
                    ArgSettings::AllowEmptyValues, // Allows an arg accept empty values such as `""`
                ])
                .default_value(""),
        )
        .arg(
            Arg::new("stripe-restricted-api-key")
                .long("stripe-restricted-api-key")
                .about("Restricted Stripe.com API key (prefixed by 'rk_*')")
                .long_about(
                    "Restricted Stripe.com API key (prefixed by 'rk_*') to be used when calling \
                    Stripe.com APIs. Secret API key should never be used directly in this application. \
                    More information: https://stripe.com/docs/keys#limit-access",
                )
                .takes_value(true),
        )
        .arg(
            Arg::new("stripe-webhook-secret")
                .long("stripe-webhook-secret")
                .about("Secret key for webhooks verification.")
                .long_about(
                    "Stripe generates a unique secret key for each webhooks endpoint. It is being \
                    used for verifying the webhook payload signature to make sure that only \
                    Stripe.com can send these payloads.",
                )
                .takes_value(true),
        ).subcommand(
            App::new("generate-cli-completions")
                .about("Generate CLI completions for specified shells.")
                .arg(
                    Arg::new("shell")
                        .long("shell")
                        .takes_value(true)
                        .possible_values(&["bash", "zsh"])
                        .settings(&[
                            ArgSettings::Required
                        ])
                )
        )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn generated_clap_usage_test_long_help() {
        let mut output = Vec::new();
        generate_clap_app().write_long_help(&mut output).unwrap();

        insta::with_settings!({snapshot_path => "__snapshots__"}, {
            insta::assert_snapshot!(String::from_utf8(output).unwrap())
        });
    }

    #[test]
    fn generated_clap_usage_test_short_help() {
        let mut output = Vec::new();
        generate_clap_app().write_help(&mut output).unwrap();

        insta::with_settings!({snapshot_path => "__snapshots__"}, {
            insta::assert_snapshot!(String::from_utf8(output).unwrap())
        });
    }
}
