// @flow

import os from 'os';
import path from 'path';
import chalk from 'chalk';
import { Workspaces } from '@adeira/monorepo-utils';
import { ShellCommand } from '@adeira/shell-command';

/* eslint-disable no-console */

// yarn monorepo-babel-node scripts/findUnreleasedPackages.js

const workspaces = Workspaces.getWorkspacesSync();

for (const workspace of workspaces) {
  const packageJSON = require(workspace);
  if (packageJSON.private === false) {
    // get Git SHA of the version line in package.json
    const versionLine = new ShellCommand(
      null,
      'git',
      '--no-pager',
      'blame',
      '-L',
      `/"version":\\s"/,+1`,
      workspace,
    )
      .runSynchronously()
      .getStdout();

    const versionSHA = versionLine.split(' ')[0];

    const log = new ShellCommand(
      null,
      'git',
      '--no-pager',
      'log',
      '--oneline',
      `${versionSHA}..HEAD`,
      path.dirname(workspace),
    )
      .runSynchronously()
      .getStdout()
      .trim();

    const logLength = log.split(os.EOL).length - 1;
    if (logLength > 10) {
      // this package needs some attention and potentially a release
      console.warn(
        chalk.cyan.bold('%s has many (%s) UNRELEASED COMMITS'),
        packageJSON.name,
        logLength,
      );
      console.warn(`git log --oneline %s..HEAD -- %s`, versionSHA, path.dirname(workspace));
      console.warn(`git diff --oneline %s..HEAD -- %s`, versionSHA, path.dirname(workspace));
      console.warn(os.EOL);
    }
  }
}
