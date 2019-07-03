// @flow

import { type WorkspaceDependencies } from './Workspaces.flow';

/**
 * This function tries to find dirty (touched) workspaces based on workspace
 * locations but doesn't deal with the relations between them.
 */
export default function findDirtyWorkspaces(
  workspaceDependencies: WorkspaceDependencies,
  changedFiles: $ReadOnlyArray<string>,
): $ReadOnlySet<string> {
  const dirtyWorkspaces = new Set<string>();
  Object.keys(workspaceDependencies).forEach(dependencyName => {
    const value = workspaceDependencies[dependencyName];
    changedFiles.forEach(changedFile => {
      if (new RegExp(value.location).test(changedFile)) {
        dirtyWorkspaces.add(dependencyName);
      }
    });
  });
  return dirtyWorkspaces;
}
