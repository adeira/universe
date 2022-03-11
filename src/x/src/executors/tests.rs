use crate::executors::{create_command, execute_command};

pub fn run(trailing_args: &Vec<&str>) -> anyhow::Result<()> {
    execute_command(
        // TODO: replace this with our logic in this executor? (instead of the monorepo runner)
        create_command("./src/monorepo-utils/bin/monorepo-run-tests.js")
            .unwrap()
            .args(trailing_args),
    )
}
