use clap::{Arg, ArgMatches, Command};

mod executors;

/// Creates a subcommand that allows any trailing arguments and is later able to forward them to
/// the executed process.
fn clap_fallthrough_subcommand(subcommand_name: &str) -> Command {
    Command::new(String::from(subcommand_name)).arg(
        Arg::new("__trailing_args")
            .num_args(1..)
            .allow_hyphen_values(true)
            .trailing_var_arg(true),
    )
}

fn collect_trailing_args(matches: &ArgMatches) -> Vec<&str> {
    match matches.get_many::<String>("__trailing_args") {
        Some(args) => args.map(|s| s.as_str()).collect(),
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
        .subcommand(clap_fallthrough_subcommand("tests"))
        .subcommand(clap_fallthrough_subcommand("scanner"))
        .subcommand(clap_fallthrough_subcommand("install"));

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
        Some(("tests", matches)) => {
            // TODO: check prerequisites
            executors::tests::run(&collect_trailing_args(matches))?;
        }
        Some(("scanner", matches)) => {
            executors::scanner::run(&collect_trailing_args(matches))?;
        }
        Some(("install", matches)) => {
            executors::install::run(&collect_trailing_args(matches))?;
        }
        _ => {
            // TODO: how about exit codes?
            executors::flow::run(&vec!["--max-warnings=0"])?;
            // TODO: DRY (?)
            executors::lints::run_eslint_config_prettier_check()?;
            executors::lints::run_prettier_check()?;
            executors::lints::run_eslint_check(&vec![])?;
            executors::tests::run(&vec!["--ci", "--colors"])?;
            executors::scanner::run(&vec![])?;
        }
    };

    Ok(())
}
