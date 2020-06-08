// @flow strict

import findDirtyWorkspaces from './findDirtyWorkspaces';
import findRelatedWorkspaces from './findRelatedWorkspaces';
import type { WorkspaceDependencies } from './Workspaces.flow';

/**
 * This function combines `findDirtyWorkspaces` and `findRelatedWorkspaces`
 * together. It takes the changed files and it returns paths necessary to test
 * based on these paths.
 */
export default function findPathsToTest(
  workspaceDependencies: WorkspaceDependencies,
  changedFiles: $ReadOnlyArray<string>,
): $ReadOnlySet<string> {
  const dirtyWorkspaces = findDirtyWorkspaces(workspaceDependencies, changedFiles);

  const relatedWorkspaces = findRelatedWorkspaces(workspaceDependencies, dirtyWorkspaces);

  const pathsToTest = new Set<string>();
  relatedWorkspaces.forEach(relatedWorkspace => {
    pathsToTest.add(workspaceDependencies[relatedWorkspace].location);
  });

  console.warn('DIRTY WORKSPACES:', dirtyWorkspaces); // eslint-disable-line no-console
  console.warn('TESTING WORKSPACES:', relatedWorkspaces); // eslint-disable-line no-console

  return pathsToTest;
}
