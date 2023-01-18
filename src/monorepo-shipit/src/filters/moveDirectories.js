// @flow strict

import _esc from './_esc';
import Changeset, { type Diff } from '../Changeset';

/**
 * Apply patches to a different directory in the destination repository.
 */
export default function moveDirectories(
  changeset: Changeset,
  mapping: Map<string, string>,
): Changeset {
  const rewriteCallback = (oldPath: string) => {
    let newPath = oldPath;
    for (const [src, dest] of mapping.entries()) {
      let matchFound = false;
      if (new RegExp(`^${_esc(src)}`).test(newPath)) {
        matchFound = true;
      }
      newPath = newPath.replace(new RegExp(`^${_esc(src)}`), dest);
      if (matchFound) {
        break; // only first match in the map
      }
    }
    return newPath;
  };

  const diffs = new Set<Diff>();
  for (const diff of changeset.getDiffs()) {
    const oldPath = diff.path;
    const newPath = rewriteCallback(oldPath);
    if (oldPath === newPath) {
      diffs.add(diff);
      continue;
    }

    let body = diff.body;
    body = body.replace(new RegExp(`^--- a/${_esc(oldPath)}`, 'm'), `--- a/${newPath}`);
    body = body.replace(new RegExp(`^\\+\\+\\+ b/${_esc(oldPath)}`, 'm'), `+++ b/${newPath}`);

    diffs.add({
      path: newPath,
      body,
    });
  }

  return changeset.withDiffs(diffs);
}
