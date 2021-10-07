use clap::{App, ArgSettings};

pub fn generate_clap_app() -> App<'static> {
    clap::app_from_crate!()
        .arg(
            clap::Arg::new("no-migrations")
                .long("no-migrations")
                .takes_value(false)
                .about("Skips database migrations"),
        )
        .arg(
            clap::Arg::new("arangodb-url")
                .long("arangodb-url")
                .takes_value(true)
                .default_value("http://127.0.0.1:8529/"),
        )
        .arg(
            clap::Arg::new("arangodb-database")
                .long("arangodb-database")
                .takes_value(true)
                .default_value("abacus"),
        )
        .arg(
            clap::Arg::new("arangodb-username")
                .long("arangodb-username")
                .takes_value(true)
                .default_value("abacus"),
        )
        .arg(
            clap::Arg::new("arangodb-password")
                .long("arangodb-password")
                .takes_value(true)
                .settings(&[
                    ArgSettings::AllowEmptyValues, // Allows an arg accept empty values such as `""`
                ])
                .default_value(""),
        )
        .arg(
            clap::Arg::new("stripe-restricted-api-key")
                .long("stripe-restricted-api-key")
                .about("Restricted Stripe.com API key (prefixed by 'rk_*')")
                .long_about(
                    "Restricted Stripe.com API key (prefixed by 'rk_*') to be used when calling \
                    Stripe.com APIs. Secret API key should never be used directly in this application. \
                    More information: https://stripe.com/docs/keys#limit-access",
                )
                .takes_value(true),
        )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn generated_clap_usage_test() {
        let mut output = Vec::new();
        generate_clap_app().write_long_help(&mut output).unwrap();

        insta::with_settings!({snapshot_path => "__snapshots__"}, {
            insta::assert_snapshot!(String::from_utf8(output).unwrap())
        });
    }
}
