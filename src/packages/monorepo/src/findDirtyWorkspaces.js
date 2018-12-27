// @flow

import { type WorkspaceDependencies } from './Workspaces.flow';

export default function findDirtyWorkspaces(
  workspaceDependencies: WorkspaceDependencies,
  changedFiles: $ReadOnlyArray<string>,
) {
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
