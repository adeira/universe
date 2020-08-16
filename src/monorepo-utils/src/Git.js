// @flow strict

import os from 'os';

import ShellCommand from './ShellCommand';

function __parseRows(changes /*: string */) /*: $ReadOnlyArray<string> */ {
  return changes.split(os.EOL).filter((row) => row !== '');
}

function git(...args /*: $ReadOnlyArray<string> */): string {
  // TODO: unify with Git implementation from Shipit (?)
  return new ShellCommand(null, 'git', '--no-pager', ...args)
    .setEnvironmentVariables(
      new Map([
        // https://git-scm.com/docs/git#_environment_variables
        ['GIT_CONFIG_NOSYSTEM', '1'],
        ['GIT_TERMINAL_PROMPT', '0'],
      ]),
    )
    .runSynchronously()
    .getStdout();
}

const Git = {
  __parseRows,

  getHeadRevision(short /*: boolean */): string {
    const printShort = short ? '--short' : '';
    return git('rev-parse', printShort, 'HEAD').trim();
  },

  getUntrackedFiles() /*: $ReadOnlyArray<string> */ {
    const rawUntrackedChanges = git('ls-files', '--others', '--exclude-standard');
    return __parseRows(rawUntrackedChanges);
  },

  getStagedChangedFiles() /*: $ReadOnlyArray<string> */ {
    const rawWorktreeChanges = git('diff', '--name-only', '--cached');
    return __parseRows(rawWorktreeChanges);
  },

  // Returns BOTH files staged for commit and not staged files changed since last commit
  getWorktreeChangedFiles() /*: $ReadOnlyArray<string> */ {
    const rawWorktreeChanges = git('diff', '--name-only', 'HEAD');
    return __parseRows(rawWorktreeChanges);
  },

  getWorktreeChanges() /*: string */ {
    const rawWorktreeChanges = git('diff', 'HEAD');
    return rawWorktreeChanges.trim();
  },

  getChangedFiles() /*: $ReadOnlyArray<string> */ {
    const rawChanges = git('diff', '--name-only', 'origin/master...HEAD');
    return __parseRows(rawChanges);
  },

  getLastCommitChanges() /*: $ReadOnlyArray<string> */ {
    const rawChanges = git('diff', '--name-only', 'HEAD^', 'HEAD');
    return __parseRows(rawChanges);
  },

  getChangesToTest() /*: $ReadOnlyArray<string> */ {
    let changes = Git.getUntrackedFiles()
      .concat(Git.getWorktreeChangedFiles())
      .concat(Git.getChangedFiles());
    if (changes.length === 0) {
      changes = Git.getLastCommitChanges();
    }
    return changes;
  },
};

module.exports = Git;
