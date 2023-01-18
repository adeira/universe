// @flow strict

import path from 'path';

import Changeset, { type Diff } from '../Changeset';

/**
 * Remove any modifications outside of specified roots.
 */
export default function stripExceptDirectories(
  changeset: Changeset,
  rawRoots: Set<string>,
): Changeset {
  const roots = new Set<string>();
  rawRoots.forEach((rawRoot) =>
    roots.add(rawRoot.endsWith(path.sep) ? rawRoot : rawRoot + path.sep),
  );
  const diffs = new Set<Diff>();
  for (const diff of changeset.getDiffs()) {
    const path = diff.path;
    for (const root of roots) {
      if (path.startsWith(root)) {
        diffs.add(diff);
        break;
      }
    }
  }
  return changeset.withDiffs(diffs);
}
