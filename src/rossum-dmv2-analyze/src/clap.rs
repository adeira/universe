use clap::{Arg, Command};

pub fn generate_clap_app() -> Command {
    clap::command!()
        .arg(
            Arg::new("concurrency")
                .short('c')
                .long("concurrency")
                .num_args(1)
                .long_help("How many annotations should be analyzed concurrently.")
                .required(false)
                .default_value("100"),
        )
        .arg(
            Arg::new("config-file")
                .long("config-file")
                .num_args(1)
                .long_help(
                    "JSON config file with the new DMv2 configuration. Copy-paste here the whole \
                    content of DMv2 configuration including the top-level `configurations` key.",
                )
                .required(true),
        )
        .arg(
            Arg::new("dm-hook-id")
                .long("dm-hook-id")
                .num_args(1)
                .long_help("DMv2 hook ID to analyze against.")
                .required(true),
        )
        .arg(
            Arg::new("queue-id")
                .long("queue-id")
                .num_args(1)
                .long_help(
                    "Queue ID that will be used for the analysis of all relevant annotations.",
                )
                .required(true),
        )
        .arg(
            Arg::new("api-token")
                .long("api-token")
                .num_args(1)
                .long_help(
                    "API token belonging to the organization that will be used for calling Rossum API endpoints.",
                )
                .required(true),
        )
}
