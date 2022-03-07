use crate::executors::{create_command, execute_command};
use log::info;

pub fn run(trailing_args: &Option<&str>) -> anyhow::Result<()> {
    info!("Executing all tests");
    execute_command(
        // TODO: replace this with our logic in this executor? (instead of the monorepo runner)
        create_command("./src/monorepo-utils/bin/monorepo-run-tests.js")
            .unwrap()
            .args(trailing_args),
    )
}
