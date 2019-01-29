// @flow

import os from 'os';
import execa from 'execa';
import isCI from 'is-ci';

export function _parseRows(changes: string): $ReadOnlyArray<string> {
  return changes.split(os.EOL).filter(row => row !== '');
}

/**
 * Returns uncommitted changes only in the Git worktree.
 */
export function getWorktreeChangedFiles(): $ReadOnlyArray<string> {
  const { stdout: rawUncommittedChanges } = execa.sync('git', [
    '--no-pager',
    'diff',
    '--name-only',
    'HEAD',
  ]);

  return _parseRows(rawUncommittedChanges);
}

/**
 * Returns changed files in the last commit. Uses this command:
 *
 *     # uncommitted changes
 *     git --no-pager diff --name-only HEAD
 *
 * In case there no changes (every change is committed) this command is used:
 *
 *     # changes in the last commit
 *     git --no-pager diff --name-only HEAD^1 HEAD
 *
 * It returns something like this:
 *
 *     src/packages/eslint-config-kiwicom/index.js
 *     src/packages/eslint-config-kiwicom/ourRules.js
 *     src/packages/eslint-config-kiwicom/package.json
 */
export default function getChangedFiles(): $ReadOnlyArray<string> {
  const { stdout: rawChangesInLastCommitFiles } = execa.sync('git', [
    '--no-pager',
    'diff',
    '--name-only',
    'HEAD^1',
    'HEAD',
  ]);

  const uncommittedChanges = getWorktreeChangedFiles();
  const changesInLastCommitFiles = _parseRows(rawChangesInLastCommitFiles);

  // It's OK to run tests on uncommitted changes locally but it's unexpected
  // in CI because it indicates that CI generated something which is not
  // expected (tests runner would be confused and it would try to test
  // the newly generated files).
  if (isCI === true && uncommittedChanges.length > 0) {
    // eslint-disable-next-line no-console
    console.error(
      `ERROR: There are some uncommitted changes in the working tree:

${uncommittedChanges.join(os.EOL)}

This usually means that CI generated some changes (for example during installation of dependencies) which is unexpected. Please try to fix it locally and commit the newly generated files.`,
    );
    process.exit(1);
  }

  return uncommittedChanges.length > 0
    ? uncommittedChanges
    : changesInLastCommitFiles;
}
