// @flow

import fs from 'fs';
import os from 'os';
import path from 'path';
import { ShellCommand } from '@adeira/shell-command';

import accounts from './accounts';
import RepoGit from './RepoGit';

export default class RepoGitFake extends RepoGit {
  #testRepoPath: string;

  constructor(
    testRepoPath: string = fs.mkdtempSync(path.join(os.tmpdir(), 'adeira-shipit-tests-')),
  ) {
    new ShellCommand(testRepoPath, 'git', 'init').runSynchronously();
    const username = 'adeira-shipit-tests';
    for (const [key, value] of Object.entries({
      'user.email': accounts.get(username),
      'user.name': username,
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

  /* $FlowFixMe[incompatible-type] This comment suppresses an error when
   * upgrading Flow. To see the error delete this comment and run Flow. */
  /* $FlowFixMe[signature-verification-failure] This comment suppresses an
   * error when upgrading Flow. To see the error delete this comment and run
   * Flow. */
  export = (): void => {};

  getFakeRepoPath(): string {
    return this.#testRepoPath;
  }

  printFakeRepoHistory(): string {
    return this._gitCommand('log', '--stat', '--pretty=format:SUBJ: %s%nDESC: %b')
      .runSynchronously()
      .getStdout()
      .trim();
  }
}
