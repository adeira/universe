// @flow

import os from 'os';
import execa from 'execa';

export function _parseRows(changes: string): $ReadOnlyArray<string> {
  return changes.split(os.EOL).filter(row => row !== '');
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
  const { stdout: rawUncommittedChanges } = execa.sync('git', [
    '--no-pager',
    'diff',
    '--name-only',
    'HEAD',
  ]);

  const { stdout: rawChangesInLastCommitFiles } = execa.sync('git', [
    '--no-pager',
    'diff',
    '--name-only',
    'HEAD^1',
    'HEAD',
  ]);

  const uncommittedChanges = _parseRows(rawUncommittedChanges);
  const changesInLastCommitFiles = _parseRows(rawChangesInLastCommitFiles);

  return uncommittedChanges.length > 0
    ? uncommittedChanges
    : changesInLastCommitFiles;
}
