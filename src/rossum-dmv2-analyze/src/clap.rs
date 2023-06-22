use clap::{Arg, Command};

pub fn generate_clap_app() -> Command {
    clap::command!()
        .arg(
            Arg::new("concurrency")
                .long("concurrency")
                .num_args(1)
                .help("How many annotations should be analyzed concurrently.")
                .required(false)
                .default_value("100"),
        )
        .arg(
            Arg::new("config-file")
                .long("config-file")
                .num_args(1)
                .help("JSON config file with the new DMv2 configuration.")
                .required(true),
        )
        .arg(
            Arg::new("dm-hook-id")
                .long("dm-hook-id")
                .num_args(1)
                .help("DMv2 hook ID")
                .required(true),
        )
        .arg(
            Arg::new("queue-id")
                .long("queue-id")
                .num_args(1)
                .help("Queue ID")
                .required(true),
        )
        .arg(
            Arg::new("api-token")
                .long("api-token")
                .num_args(1)
                .required(true),
        )
}
