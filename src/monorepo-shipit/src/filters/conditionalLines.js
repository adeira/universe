// @flow strict

import Changeset, { type Diff } from '../Changeset';
import _esc from './_esc';

function process(changeset: Changeset, pattern: RegExp, replacement: string) {
  const diffs = new Set<Diff>();
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
  const pattern = new RegExp(
    `^([-+ ]\\s*)(\\S.*) ${_esc(commentStart)} ${_esc(marker)}${_esc(ending)}$`,
  );
  return process(changeset, pattern, `$1${commentStart} ${marker}: $2${ending}`);
}

export function uncommentLines(
  changeset: Changeset,
  marker: string = '@x-oss-disable',
  commentStart: string = '//',
  commentEnd: null | string = null,
): Changeset {
  const ending = commentEnd === null ? '' : ` ${commentEnd}`;
  const pattern = new RegExp(
    `^([-+ ]\\s*)${_esc(commentStart)} ${_esc(marker)}: (.+)${_esc(ending)}$`,
  );
  return process(changeset, pattern, `$1$2 ${commentStart} ${marker}${ending}`);
}
