use crate::executors::{create_command, execute_command};

const FLOW_BIN: &str = "./node_modules/.bin/flow"; // from monorepo root

pub fn run(trailing_args: &Vec<&str>) -> anyhow::Result<()> {
    execute_command(create_command(FLOW_BIN).unwrap().args(trailing_args))
}
