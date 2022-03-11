use crate::executors::{create_command, execute_command};

const JEST_BIN: &str = "./node_modules/.bin/jest";

pub fn run(trailing_args: &Vec<&str>) -> anyhow::Result<()> {
    execute_command(
        create_command(JEST_BIN)
            .expect("Jest binary doesn't exist")
            .arg("--config")
            .arg("src/monorepo-scanner/.jest.config.js")
            .args(trailing_args),
    )
}
