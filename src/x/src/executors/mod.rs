use log::info;
use std::process::{Command, Stdio};

pub mod flow;
pub mod lints;
pub mod relay;
pub mod scanner;
pub mod tests;

fn create_command(bin_path: &str) -> anyhow::Result<Command> {
    let mut command = Command::new(bin_path);
    command
        .current_dir("./../../") // Adeira/Universe root
        .stdout(Stdio::inherit())
        .stderr(Stdio::inherit());

    Ok(command)
}

fn execute_command(command: &mut Command) -> anyhow::Result<()> {
    info!("{:?}", &command);

    match command.spawn().unwrap().wait().unwrap().code() {
        Some(0) => Ok(()),
        Some(code) => anyhow::bail!("exited with status code: {}", code),
        None => anyhow::bail!("process terminated by signal"),
    }
}
