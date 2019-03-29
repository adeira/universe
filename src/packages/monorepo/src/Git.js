// @flow

const os = require('os');

const ChildProcess = require('./ChildProcess');

function __parseRows(changes /*: string */) /*: $ReadOnlyArray<string> */ {
  return changes.split(os.EOL).filter(row => row !== '');
}

function git(args /*: $ReadOnlyArray<string> */) {
  return ChildProcess.executeSystemCommand('git', ['--no-pager', ...args]);
}

const Git = {
  __parseRows,

  getUntrackedFiles() /*: $ReadOnlyArray<string> */ {
    const rawUntrackedChanges = git([
      'ls-files',
      '--others',
      '--exclude-standard',
    ]);
    return __parseRows(rawUntrackedChanges);
  },

  // Returns uncommitted (but staged) changes from Git worktree.
  getWorktreeChangedFiles() /*: $ReadOnlyArray<string> */ {
    const rawWorktreeChanges = git(['diff', '--name-only', 'HEAD']);
    return __parseRows(rawWorktreeChanges);
  },

  getChangedFiles() /*: $ReadOnlyArray<string> */ {
    const rawChanges = git(['diff', '--name-only', 'origin/master...HEAD']);
    return __parseRows(rawChanges);
  },

  getLastCommitChanges() /*: $ReadOnlyArray<string> */ {
    const rawChanges = git(['diff', '--name-only', 'HEAD^', 'HEAD']);
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
