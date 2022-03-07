use crate::executors::{create_command, execute_command};
use log::info;

const JEST_BIN: &str = "./node_modules/.bin/jest";

pub fn run(trailing_args: &Option<&str>) -> anyhow::Result<()> {
    info!("Executing monorepo scanner");
    execute_command(
        create_command(JEST_BIN)
            .expect("Jest binary doesn't exist")
            .arg("--config")
            .arg("src/monorepo-scanner/.jest.config.js")
            .args(trailing_args),
    )
}
