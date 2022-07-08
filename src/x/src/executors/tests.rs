use crate::executors::{create_command, execute_command};

const JEST_BIN: &str = "./node_modules/.bin/jest"; // from monorepo root
const JEST_CONFIG: &str = "./.jest.config.js";

pub fn run(trailing_args: &Vec<&str>) -> anyhow::Result<()> {
    execute_command(
        create_command(JEST_BIN)
            .expect("Jest binary doesn't exist")
            .arg("--config")
            .arg(JEST_CONFIG)
            .args(trailing_args),
    )
}
