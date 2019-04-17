// @flow strict

const nodeChildProcess = require('child_process');

/**
 * This is our opinionated wrapper around `child_process` module. It exposes
 * limited API to call underlying system commands securely with proper Flow
 * types. It also throws exceptions instead of exiting so you can catch the
 * failures and react easily (for example call `--abort` when working with Git).
 */
module.exports = class ShellCommand {
  cwd: string;
  command: $ReadOnlyArray<string>;
  outputToScreen: boolean = false;
  stdin: string;
  throwForNonZeroExit: boolean = true;

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

  /**
   * Please note: this function is synchronous which means it should be used for
   * your dev scripts and not to be executed in production.
   */
  runSynchronously(): string {
    const [command, ...args] = this.command.filter(arg => arg !== '');
    const response = nodeChildProcess.spawnSync(command, args, {
      cwd: this.cwd,
      // stdin, stdout, stderr
      stdio: [
        'inherit', // `this.setStdin` automatically overwrites this
        // We have to make a decision here: either use 'inherit' and print into
        // console with colors and everything OR 'pipe' and get output.
        this.outputToScreen ? 'inherit' : 'pipe',
        this.outputToScreen ? 'inherit' : 'pipe',
      ],
      input: this.stdin,
    });

    const maybeThrow = error => {
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
      maybeThrow(
        new Error(`Command failed with exit code ${response.status}.`),
      );
    }

    // Should we return object with `stdout` and `stderr`?
    return response.stdout ? response.stdout.toString().trim() : '';
  }
};
