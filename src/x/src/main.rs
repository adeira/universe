use clap::{App as ClapApp, AppSettings as ClapAppSettings, Arg as ClapArg};

mod executors;

/// Creates a subcommand that allows any trailing arguments and is later able to forward them to
/// the executed process.
fn clap_fallthrough_subcommand(subcommand_name: &str) -> ClapApp {
    ClapApp::new(subcommand_name)
        .setting(ClapAppSettings::TrailingVarArg)
        .arg(
            ClapArg::new("trailing_args")
                .takes_value(true)
                .multiple_values(true),
        )
}

fn main() -> anyhow::Result<()> {
    std::env::set_var("RUST_LOG", "info");
    env_logger::init();

    let clap_app = clap::app_from_crate!()
        .setting(
            ClapAppSettings::SubcommandRequiredElseHelp // TODO: make this optional and always run all by default (?)
            | ClapAppSettings::InferSubcommands,
        )
        .subcommand(
            ClapApp::new("run")
                .setting(ClapAppSettings::InferSubcommands)
                // TODO: Shipit, FBT, "publish NPM package", run Rust projects, verify signed sources, …
                .subcommand(clap_fallthrough_subcommand("flow"))
                .subcommand(clap_fallthrough_subcommand("lints"))
                .subcommand(clap_fallthrough_subcommand("relay"))
                .subcommand(clap_fallthrough_subcommand("tests"))
                .subcommand(clap_fallthrough_subcommand("scanner")),
        )
        .subcommand(ClapApp::new("install"));

    let matches = clap_app.get_matches();

    // 1st level subcommand
    let matches = match matches.subcommand() {
        Some(("run", matches)) => matches,
        Some(("install", matches)) => {
            todo!("yarn install")
        }
        _ => unreachable!("clap should ensure we don't get here"),
    };

    // 2nd level subcommand
    match matches.subcommand() {
        Some(("flow", matches)) => {
            executors::flow::check_version()?;
            executors::flow::run(&matches.value_of("trailing_args"))?;
        }
        Some(("lints", matches)) => {
            executors::lints::run_eslint_config_prettier_check()?;
            executors::lints::run_prettier_check()?;
            executors::lints::run_eslint_check(&matches.value_of("trailing_args"))?;
        }
        Some(("relay", matches)) => {
            // TODO: check prerequisites (watchman)
            executors::relay::run(&matches.value_of("trailing_args"))?;
        }
        Some(("tests", matches)) => {
            // TODO: check prerequisites
            executors::tests::run(&matches.value_of("trailing_args"))?;
        }
        Some(("scanner", matches)) => {
            executors::scanner::run(&matches.value_of("trailing_args"))?;
        }
        _ => {
            // TODO: how about exit codes?
            executors::flow::run(&None)?; // TODO: --max-warnings=0
            executors::lints::run_eslint_config_prettier_check()?;
            executors::lints::run_prettier_check()?;
            executors::lints::run_eslint_check(&None)?;
            executors::relay::run(&Some("--validate"))?;
            executors::tests::run(&None)?; // TODO: --ci --colors
            executors::scanner::run(&None)?;
        }
    };

    Ok(())
}
