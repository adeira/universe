// @flow strict-local

import fs from 'fs';
import os from 'os';
import path from 'path';
import { ShellCommand } from '@kiwicom/monorepo-utils';

import RepoGit from './RepoGit';

export default class RepoGitFake extends RepoGit {
  constructor() {
    const testRepoPath = fs.mkdtempSync(path.join(os.tmpdir(), 'kiwicom-shipit-tests-'));
    new ShellCommand(testRepoPath, 'git', 'init').runSynchronously();
    for (const [key, value] of Object.entries({
      'user.email': 'shipit-tests@kiwi.com',
      'user.name': 'kiwicom-shipit-tests',
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
  }

  push = () => {};

  configure = () => {};

  checkoutBranch = () => {};

  clean = () => {};

  // $FlowExpectedError: this function overwrites the original and returns nothing
  export = (): void => {};
}
