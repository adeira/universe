// @flow

import Changeset from '../Changeset';

function matchesAnyPattern(path: string, stripPatterns: Set<RegExp>): RegExp | null {
  for (const stripPattern of stripPatterns) {
    if (stripPattern.test(path)) {
      return stripPattern;
    }
  }
  return null;
}

/**
 * Remove any modifications to paths matching `stripPatterns`.
 */
export default function stripPaths(changeset: Changeset, stripPatterns: Set<RegExp>): Changeset {
  if (stripPatterns.size === 0) {
    return changeset;
  }

  let newChangeset = changeset;
  const diffs = new Set();
  for (const diff of changeset.getDiffs()) {
    const path = diff.path;
    const match = matchesAnyPattern(path, stripPatterns);
    if (match !== null) {
      // stripping because matching pattern was found
      newChangeset = newChangeset.withDebugMessage(
        'STRIP FILE: "%s" matches pattern "%s"',
        path,
        match.toString(),
      );
      continue;
    }
    diffs.add(diff);
  }

  return newChangeset.withDiffs(diffs);
}
