// @flow

import { type WorkspaceDependencies } from './Workspaces.flow';

/**
 * Finds related workspaces in monorepo. Related workspace is every
 * workspace which is a dependency (recursively). Examples:
 *
 * 1) @kiwicom/graphql has workspace dependencies but it's not a
 *    dependency itself. Therefore it returns only @kiwicom/graphql.
 *
 * 2) @kiwicom/signed-source doesn't have dependency but some other
 *    package depends on it. Therefore this function returns this
 *    package as well as every affected package recursively.
 */
export default function findRelatedWorkspaces(
  workspaceDependencies: WorkspaceDependencies,
  touchedWorkspaces: Set<string>,
) {
  // 1) the initial workspaces itself
  const workspacesToTest = new Set<string>(touchedWorkspaces);

  // 2) workspaces depending on this workspace
  Object.keys(workspaceDependencies).forEach(key => {
    const value = workspaceDependencies[key];
    touchedWorkspaces.forEach(touchedWorkspace => {
      if (value.workspaceDependencies.includes(touchedWorkspace)) {
        findRelatedWorkspaces(workspaceDependencies, new Set([key])).forEach(
          relatedWorkspace => {
            workspacesToTest.add(relatedWorkspace);
          },
        );
      }
    });
  });

  return workspacesToTest;
}
