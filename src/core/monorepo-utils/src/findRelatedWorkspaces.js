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
  touchedWorkspaces: $ReadOnlySet<string>,
): $ReadOnlySet<string> {
  const workspacesToTest = new Set<string>();

  (function unwind(touchedWorkspaces) {
    touchedWorkspaces.forEach(touchedWorkspace => {
      // add the touched dependencies itself
      workspacesToTest.add(touchedWorkspace);

      // find the touched workspaces everywhere in individual `workspaceDependencies`
      Object.keys(workspaceDependencies).forEach(key => {
        if (
          workspaceDependencies[key].workspaceDependencies.includes(
            touchedWorkspace,
          )
        ) {
          if (!workspacesToTest.has(key)) {
            workspacesToTest.add(key);
            unwind([key]);
          }
        }

        if (
          workspaceDependencies[key].mismatchedWorkspaceDependencies.includes(
            touchedWorkspace,
          )
        ) {
          if (!workspacesToTest.has(key)) {
            workspacesToTest.add(key);
            unwind([key]);
          }
        }
      });
    });
  })(touchedWorkspaces);

  return workspacesToTest;
}
