use crate::executors::{create_command, execute_command};

const YARN_BIN: &str = "yarn"; // currently we expect it to be installed globally (via corepack)

// TODO: configure Rust toolchain (similar to https://github.com/dtolnay/rust-toolchain)
pub fn run(trailing_args: &Vec<&str>) -> anyhow::Result<()> {
    execute_command(
        create_command(YARN_BIN)
            .expect("Yarn binary doesn't exist")
            .arg("install")
            .args(trailing_args),
    )
}
