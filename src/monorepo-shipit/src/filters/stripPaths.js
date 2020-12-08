// @flow

import Changeset from '../Changeset';

function matchesAnyPattern(path: string, stripPatterns: Set<RegExp>, changeset: Changeset) {
  for (const stripPattern of stripPatterns) {
    if (stripPattern.test(path)) {
      changeset.withDebugMessage(
        'STRIP FILE: "%s" matches pattern "%s"',
        path,
        stripPattern.toString(),
      );
      return true;
    }
  }
  return false;
}

/**
 * Remove any modifications to paths matching `stripPatterns`.
 */
export default function stripPaths(changeset: Changeset, stripPatterns: Set<RegExp>): Changeset {
  if (stripPatterns.size === 0) {
    return changeset;
  }
  const diffs = new Set();
  for (const diff of changeset.getDiffs()) {
    const path = diff.path;
    if (matchesAnyPattern(path, stripPatterns, changeset)) {
      // stripping because matching pattern was found
      continue;
    }
    diffs.add(diff);
  }
  return changeset.withDiffs(diffs);
}
