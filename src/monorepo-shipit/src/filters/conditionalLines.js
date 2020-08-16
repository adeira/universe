// @flow strict

import Changeset from '../Changeset';

// https://github.com/lodash/lodash/blob/f8c7064d450cc068144c4dad1d63535cba25ae6d/escapeRegExp.js
function _e(s) {
  // RegExp.escape substitute
  return s.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}

function process(changeset: Changeset, pattern: RegExp, replacement: string) {
  const diffs = new Set();
  for (const diff of changeset.getDiffs()) {
    const newDiff = {
      ...diff,
      body: diff.body
        .split('\n')
        .map((line) => line.replace(pattern, replacement))
        .join('\n'),
    };
    diffs.add(newDiff);
  }
  return changeset.withDiffs(diffs);
}

export function commentLines(
  changeset: Changeset,
  marker: string = '@x-oss-disable',
  commentStart: string = '//',
  commentEnd: null | string = null,
): Changeset {
  const ending = commentEnd === null ? '' : ` ${commentEnd}`;
  const pattern = new RegExp(`^([-+ ]\\s*)(\\S.*) ${_e(commentStart)} ${_e(marker)}${_e(ending)}$`);
  return process(changeset, pattern, `$1${commentStart} ${marker}: $2${ending}`);
}

export function uncommentLines(
  changeset: Changeset,
  marker: string = '@x-oss-disable',
  commentStart: string = '//',
  commentEnd: null | string = null,
): Changeset {
  const ending = commentEnd === null ? '' : ` ${commentEnd}`;
  const pattern = new RegExp(`^([-+ ]\\s*)${_e(commentStart)} ${_e(marker)}: (.+)${_e(ending)}$`);
  return process(changeset, pattern, `$1$2 ${commentStart} ${marker}${ending}`);
}
