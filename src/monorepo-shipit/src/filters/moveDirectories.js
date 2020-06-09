// @flow strict

import Changeset from '../Changeset';

/**
 * Apply patches to a different directory in the destination repository.
 */
export default function moveDirectories(
  changeset: Changeset,
  mapping: Map<string, string>,
): Changeset {
  const rewriteCallback = (oldPath) => {
    let newPath = oldPath;
    for (const [src, dest] of mapping.entries()) {
      let matchFound = false;
      if (new RegExp(`^${src}`).test(newPath)) {
        matchFound = true;
      }
      newPath = newPath.replace(new RegExp(`^${src}`), dest);
      if (matchFound) {
        break; // only first match in the map
      }
    }
    return newPath;
  };

  const diffs = new Set();
  for (const diff of changeset.getDiffs()) {
    const oldPath = diff.path;
    const newPath = rewriteCallback(oldPath);
    if (oldPath === newPath) {
      diffs.add(diff);
      continue;
    }

    let body = diff.body;
    body = body.replace(new RegExp(`^--- a/${oldPath}`, 'm'), `--- a/${newPath}`);
    body = body.replace(new RegExp(`^\\+\\+\\+ b/${oldPath}`, 'm'), `+++ b/${newPath}`);

    diffs.add({
      path: newPath,
      body,
    });
  }

  return changeset.withDiffs(diffs);
}
