// @flow

import fs from 'fs';
import os from 'os';
import path from 'path';
import { ShellCommand } from '@adeira/monorepo-utils';

import accounts from './accounts';
import RepoGit from './RepoGit';

export default class RepoGitFake extends RepoGit {
  #testRepoPath: string;

  constructor(
    testRepoPath: string = fs.mkdtempSync(path.join(os.tmpdir(), 'kiwicom-shipit-tests-')),
  ) {
    new ShellCommand(testRepoPath, 'git', 'init').runSynchronously();
    const username = 'kiwicom-shipit-tests';
    for (const [key, value] of Object.entries({
      'user.email': accounts.get(username),
      'user.name': username,
    })) {
      new ShellCommand(
        testRepoPath,
        'git',
        'config',
        key,
        // $FlowIssue: https://github.com/facebook/flow/issues/2174
        value,
      ).runSynchronously();
    }
    super(testRepoPath);
    this.#testRepoPath = testRepoPath;
  }

  push = () => {};

  configure = () => {};

  checkoutBranch = () => {};

  clean = () => {};

  // $FlowExpectedError: this function overwrites the original and returns nothing
  export = (): void => {};

  getFakeRepoPath(): string {
    return this.#testRepoPath;
  }

  printFakeRepoHistory() {
    return this._gitCommand('log', '--stat', '--pretty=format:SUBJ: %s%nDESC: %b')
      .runSynchronously()
      .getStdout()
      .trim();
  }
}
