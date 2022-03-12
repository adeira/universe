// @flow strict

export default class ShellCommandResult {
  exitCode: number;
  stdout: string;
  stderr: string;

  constructor(exitCode: number, stdout: string, stderr: string) {
    this.exitCode = exitCode;
    this.stdout = stdout;
    this.stderr = stderr;
  }

  getExitCode(): number {
    return this.exitCode;
  }

  getStdout(): string {
    return this.stdout;
  }

  getStderr(): string {
    return this.stderr;
  }
}
