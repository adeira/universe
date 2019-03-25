// @flow

const os = require('os');

const ChildProcess = require('./ChildProcess');

function _parseRows(changes /*: string */) /*: $ReadOnlyArray<string> */ {
  return changes.split(os.EOL).filter(row => row !== '');
}

function git(args /*: $ReadOnlyArray<string> */) {
  return ChildProcess.spawnSync('git', ['--no-pager', ...args]);
}

const Git = {
  _parseRows,
  getUntrackedFiles() /*: $ReadOnlyArray<string> */ {
    const rawUntrackedChanges = git([
      'ls-files',
      '--others',
      '--exclude-standard',
    ]);
    return _parseRows(rawUntrackedChanges);
  },

  // Returns uncommitted (but staged) changes from Git worktree.
  getWorktreeChangedFiles() /*: $ReadOnlyArray<string> */ {
    const rawWorktreeChanges = git(['diff', '--name-only', 'HEAD']);
    return _parseRows(rawWorktreeChanges);
  },

  getChangedFiles() /*: $ReadOnlyArray<string> */ {
    const rawChanges = git(['diff', '--name-only', 'origin/master...HEAD']);
    return _parseRows(rawChanges);
  },

  getLastCommitChanges() /*: $ReadOnlyArray<string> */ {
    const rawChanges = git(['diff', '--name-only', 'HEAD^', 'HEAD']);
    return _parseRows(rawChanges);
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
