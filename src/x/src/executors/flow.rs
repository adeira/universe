use crate::executors::{create_command, execute_command};
use log::info;

const FLOW_BIN: &str = "./node_modules/.bin/flow"; // from monorepo root

pub fn check_version() -> anyhow::Result<()> {
    info!("Checking Flow version");
    execute_command(
        create_command(FLOW_BIN)
            .expect("Flow binary doesn't exist")
            .arg("version")
            .arg("--pretty"),
    )
}

pub fn run(trailing_args: &Option<&str>) -> anyhow::Result<()> {
    info!("Executing Flow check");
    execute_command(create_command(FLOW_BIN).unwrap().args(trailing_args))
}
