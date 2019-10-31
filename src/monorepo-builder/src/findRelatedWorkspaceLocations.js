// @flow strict

export type WorkspaceDependencies = {
  [string]: {|
    +location: string,
    +workspaceDependencies: $ReadOnlyArray<string>,
    +mismatchedWorkspaceDependencies: $ReadOnlyArray<string>,
  |},
  ...,
};

// TODO: DRY with `src/core/monorepo-utils/src/findRelatedWorkspaces.js` somehow (?)

/**
 * Related workspace in this context is every workspace being used by the main
 * workspace recursively.
 */
export default function findRelatedWorkspaceLocations(
  workspaceDependencies: WorkspaceDependencies,
  rootWorkspaceName: string,
): $ReadOnlySet<string> {
  const locations = new Set();

  (function recurse(workspaceName) {
    const workspace = workspaceDependencies[workspaceName];
    const workspaceLocation = workspace.location;
    locations.add(workspaceLocation);

    for (const directDependencyName of workspace.workspaceDependencies) {
      const directDependency = workspaceDependencies[directDependencyName];
      if (!locations.has(directDependency.location)) {
        recurse(directDependencyName);
      }
    }

    for (const mismatchedDependencyName of workspace.mismatchedWorkspaceDependencies) {
      const mismatchedDependency = workspaceDependencies[mismatchedDependencyName];
      if (!locations.has(mismatchedDependency.location)) {
        recurse(mismatchedDependencyName);
      }
    }
  })(rootWorkspaceName);

  return locations;
}
