// @flow strict

import os from 'os';

import ShellCommand from './ShellCommand';

/*::

type DiffFilter =
  | 'A' // added files
  | 'C' // copied
  | 'D' // deleted
  | 'M' // modified
  | 'R' // renamed
  | 'T' // type of file changed
  | 'U' // unmerged
  | 'X' // unknown
  | 'B' // broken pairing
  | 'a' // lower case letter is negation to exclude such files
  | 'c'
  | 'd'
  | 'm'
  | 'r'
  | 't'
  | 'u'
  | 'x'
  | 'b'

 */

function __parseRows(changes /*: string */) /*: $ReadOnlyArray<string> */ {
  return changes.split(os.EOL).filter(row => row !== '');
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

  // Returns uncommitted (but staged) changes from Git worktree.
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

  getChangedFilesByFilter(
    diffFilters /*: $ReadOnlyArray<DiffFilter> */,
  ) /*: $ReadOnlyArray<string> */ {
    const rawChanges = git(
      'diff',
      '--name-only',
      'origin/master...HEAD',
      `--diff-filter=${diffFilters.join('')}`,
    );
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
