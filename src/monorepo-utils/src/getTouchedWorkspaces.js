// @flow

import getChangedFiles from './getChangedFiles';
import findDirtyWorkspaces from './findDirtyWorkspaces';
import findRelatedWorkspaces from './findRelatedWorkspaces';
import getWorkspaceDependencies from './getWorkspaceDependencies';

/**
 * This function will give you all the workspaces that has been touched by your latest changes.
 * Directly changed an also those workspaces who depend on the changed workspaces
 */
export default function getTouchedWorkspaces(): $ReadOnlySet<string> {
  const workspaceDependencies = getWorkspaceDependencies();
  const changedFiles = getChangedFiles();

  const dirtyWorkspaces = findDirtyWorkspaces(workspaceDependencies, changedFiles);

  return findRelatedWorkspaces(workspaceDependencies, dirtyWorkspaces);
}
