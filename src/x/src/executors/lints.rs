use crate::executors::{create_command, execute_command};

const ESLINT_CONFIG_PRETTIER_BIN: &str = "./node_modules/.bin/eslint-config-prettier";
const PRETTIER_BIN: &str = "./node_modules/.bin/prettier";
const JEST_BIN: &str = "./node_modules/.bin/jest";
const JEST_CONFIG: &str = "./.jest-eslint.config.js";

pub fn run_eslint_config_prettier_check() -> anyhow::Result<()> {
    execute_command(
        create_command(ESLINT_CONFIG_PRETTIER_BIN)
            .unwrap()
            .arg("src/js/src/invariant.js"),
    )
}

pub fn run_prettier_check() -> anyhow::Result<()> {
    execute_command(
        create_command(PRETTIER_BIN)
            .expect("Prettier binary doesn't exist")
            .arg("--check")
            .arg("src/**/*.{md,css}")
            .arg("--check")
            .arg(".github/**/*.{yml,yaml}"),
    )
}

pub fn run_eslint_check(trailing_args: &Vec<&str>) -> anyhow::Result<()> {
    execute_command(
        create_command(JEST_BIN)
            .expect("Jest binary doesn't exist")
            .arg("--config")
            .arg(JEST_CONFIG)
            .arg("--changedSince")
            .arg("origin/master^")
            .args(trailing_args),
    )
}
