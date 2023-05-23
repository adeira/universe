// @flow

import fs from 'fs';
import os from 'os';
import path from 'path';
import { ShellCommand } from '@adeira/shell-command';

import RepoGit from './RepoGit';

/* $FlowFixMe[incompatible-extend] This comment suppresses an error when
 * upgrading Flow to version 0.203.0. To see the error delete this comment
 * and run Flow. */
export default class RepoGitFake extends RepoGit {
  #testRepoPath: string;

  constructor(
    testRepoPath: string = fs.mkdtempSync(path.join(os.tmpdir(), 'adeira-shipit-tests-')),
  ) {
    new ShellCommand(testRepoPath, 'git', 'init').runSynchronously();
    for (const [key, value] of Object.entries({
      'user.email': 'shipit-tests@adeira.dev',
      'user.name': 'adeira-shipit-tests',
    })) {
      new ShellCommand(
        testRepoPath,
        'git',
        'config',
        key,
        // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/2174
        value,
      ).runSynchronously();
    }
    super(testRepoPath);
    this.#testRepoPath = testRepoPath;
  }

  push: (destinationBranch: string) => void = () => {};

  configure: () => void = () => {};

  checkoutBranch: (branchName: string) => void = () => {};

  clean: () => void = () => {};

  /* $FlowFixMe[signature-verification-failure] This comment suppresses an
   * error when upgrading Flow. To see the error delete this comment and run
   * Flow. */
  /* $FlowFixMe[incompatible-extend] This comment suppresses an error when
   * upgrading Flow to version 0.186.0. To see the error delete this comment
   * and run Flow. */
  export = (): void => {};

  getFakeRepoPath(): string {
    return this.#testRepoPath;
  }

  printTimestamps(): string {
    return this._gitCommand('log', '--stat', '--pretty=format:AUTHOR:%aD%nCOMMIT:%cD%n')
      .runSynchronously()
      .getStdout()
      .trim();
  }

  printFakeRepoHistory(): string {
    return this._gitCommand('log', '--stat', '--pretty=format:SUBJ: %s%nDESC: %b')
      .runSynchronously()
      .getStdout()
      .trim();
  }
}
