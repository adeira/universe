use crate::executors::{create_command, execute_command};
use log::info;

const RELAY_BIN: &str = "./node_modules/.bin/relay-compiler";

pub fn run(trailing_args: &Option<&str>) -> anyhow::Result<()> {
    info!("Executing Relay Compiler");
    execute_command(
        create_command(RELAY_BIN)
            .expect("Relay binary doesn't exist")
            .args(trailing_args),
    )
}
