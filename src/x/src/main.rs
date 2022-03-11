use clap::{Arg, ArgMatches, Command};

mod executors;

/// Creates a subcommand that allows any trailing arguments and is later able to forward them to
/// the executed process.
fn clap_fallthrough_subcommand(subcommand_name: &str) -> Command {
    Command::new(subcommand_name).trailing_var_arg(true).arg(
        Arg::new("trailing_args")
            .takes_value(true)
            .multiple_values(true),
    )
}

fn collect_trailing_args(matches: &ArgMatches) -> Vec<&str> {
    match matches.values_of("trailing_args") {
        Some(args) => args.collect(),
        None => vec![],
    }
}

fn main() -> anyhow::Result<()> {
    std::env::set_var("RUST_LOG", "info");
    env_logger::init();

    let clap_app = clap::command!()
        .infer_subcommands(true)
        // TODO: Shipit, FBT, "publish NPM package", run Rust projects, verify signed sources, …
        .subcommand(clap_fallthrough_subcommand("flow"))
        .subcommand(clap_fallthrough_subcommand("lints"))
        .subcommand(clap_fallthrough_subcommand("relay"))
        .subcommand(clap_fallthrough_subcommand("tests"))
        .subcommand(clap_fallthrough_subcommand("scanner"))
        .subcommand(Command::new("install"));

    let matches = clap_app.get_matches();

    match matches.subcommand() {
        Some(("flow", matches)) => {
            executors::flow::run(&collect_trailing_args(matches))?;
        }
        Some(("lints", matches)) => {
            executors::lints::run_eslint_config_prettier_check()?;
            executors::lints::run_prettier_check()?;
            executors::lints::run_eslint_check(&collect_trailing_args(matches))?;
        }
        Some(("relay", matches)) => {
            // TODO: check prerequisites (watchman)
            executors::relay::run(&collect_trailing_args(matches))?;
        }
        Some(("tests", matches)) => {
            // TODO: check prerequisites
            executors::tests::run(&collect_trailing_args(matches))?;
        }
        Some(("scanner", matches)) => {
            executors::scanner::run(&collect_trailing_args(matches))?;
        }
        Some(("install", _matches)) => {
            todo!("yarn install")
        }
        _ => {
            // TODO: how about exit codes?
            executors::flow::run(&vec!["--max-warnings=0"])?;
            // TODO: DRY (?)
            executors::lints::run_eslint_config_prettier_check()?;
            executors::lints::run_prettier_check()?;
            executors::lints::run_eslint_check(&vec![])?;
            executors::relay::run(&vec!["--validate"])?;
            executors::tests::run(&vec!["--ci", "--colors"])?;
            executors::scanner::run(&vec![])?;
        }
    };

    Ok(())
}
