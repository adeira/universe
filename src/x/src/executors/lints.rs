use crate::executors::{create_command, execute_command};

const ESLINT_BIN: &str = "./node_modules/.bin/eslint";
const ESLINT_CONFIG_PRETTIER_BIN: &str = "./node_modules/.bin/eslint-config-prettier";
const PRETTIER_BIN: &str = "./node_modules/.bin/prettier";

pub fn run_eslint_config_prettier_check() -> anyhow::Result<()> {
    execute_command(
        create_command(ESLINT_CONFIG_PRETTIER_BIN)
            .expect("Eslint config Prettier binary doesn't exist")
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
    std::env::set_var("DEBUG", "eslint:cli-engine");
    execute_command(
        create_command(ESLINT_BIN)
            .expect("Eslint binary doesn't exist")
            .arg("--cache")
            .arg("--cache-strategy")
            .arg("content")
            .arg("--cache-location")
            .arg("node_modules/.cache/")
            .arg("*.js") // root JS files
            .arg("scripts/**/*.js")
            .arg("src/**/*.js")
            .args(trailing_args),
    )
}
