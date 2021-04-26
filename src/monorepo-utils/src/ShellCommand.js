// @flow strict

import nodeChildProcess from 'child_process';

import ShellCommandResult from './ShellCommandResult';

/**
 * This is our opinionated wrapper around `child_process` module. It exposes
 * limited API to call underlying system commands securely with proper Flow
 * types. It also throws exceptions instead of exiting so you can catch the
 * failures and react easily (for example call `--abort` when working with Git).
 */
export default class ShellCommand {
  cwd: string;
  command: $ReadOnlyArray<string>;
  outputToScreen: boolean = false;
  stdin: string;
  throwForNonZeroExit: boolean = true;
  environmentVariables: Map<string, string>;

  constructor(cwd: null | string, ...command: $ReadOnlyArray<string>) {
    this.cwd = cwd ?? process.cwd();
    this.command = command;
  }

  /**
   * Method `runSynchronously` will return empty string when you set output
   * to screen.
   */
  setOutputToScreen(): this {
    this.outputToScreen = true;
    return this;
  }

  setStdin(input: string): this {
    this.stdin = input;
    return this;
  }

  /**
   * This method will effectively hide any errors caused by child failure.
   * Use it sparingly.
   */
  setNoExceptions(): this {
    this.throwForNonZeroExit = false;
    return this;
  }

  setEnvironmentVariables(envs: Map<string, string>): this {
    this.environmentVariables = envs;
    return this;
  }

  /**
   * Please note: this function is synchronous which means it should be used for
   * your dev scripts and not to be executed in production.
   *
   * SECURITY NOTE: If the shell option is enabled, do not pass unsanitized user
   * input to this function. Any input containing shell metacharacters may be
   * used to trigger arbitrary command execution.
   */
  runSynchronously(): ShellCommandResult {
    const [command, ...args] = this.command.filter((arg) => arg !== '');
    const response = nodeChildProcess.spawnSync(command, args, {
      cwd: this.cwd,
      // stdin, stdout, stderr
      stdio: [
        this.stdin ? 'pipe' : 'inherit', // 'pipe' accepts stdin from the input, 'inherit' accepts key strokes for example
        // We have to make a decision here: either use 'inherit' and print into
        // console with colors and everything OR 'pipe' and get output.
        this.outputToScreen ? 'inherit' : 'pipe',
        this.outputToScreen ? 'inherit' : 'pipe',
      ],
      input: this.stdin,
      env: this.environmentVariables,
      maxBuffer: Infinity, // to prevent Error: spawnSync git ENOBUFS
    });

    const maybeThrow = (error) => {
      if (this.throwForNonZeroExit === true) {
        throw error;
      }
    };

    if (response.error !== undefined) {
      // this happens when command doesn't exist for example (ENOENT)
      maybeThrow(response.error);
    }

    if (response.signal !== null) {
      maybeThrow(new Error(`Command killed with signal ${response.signal}.`));
    }

    if (response.status !== 0) {
      // we could eventually pass down the status code into error so wrapping
      // scripts can return proper process.exitCode
      const stderr = response.stderr ? response.stderr.toString() : '';
      maybeThrow(
        new Error(
          `Command failed with exit code ${response.status}${stderr !== '' ? `: ${stderr}` : '.'}`,
        ),
      );
    }

    return new ShellCommandResult(
      response.status ?? 1, // status is null for signal kills and response errors
      response.stdout ? response.stdout.toString() : '',
      response.stderr ? response.stderr.toString() : '',
    );
  }
}
