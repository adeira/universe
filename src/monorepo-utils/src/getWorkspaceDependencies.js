// @flow strict

import sanitizeWorkspaces from './sanitizeWorkspaces';
import ShellCommand from './ShellCommand';
import type { WorkspaceDependencies } from './Workspaces.flow';

/**
 * This function returns the workspace dependencies
 */
export default function getWorkspaceDependencies(): WorkspaceDependencies {
  const stdout = new ShellCommand(null, 'yarn', '--json', 'workspaces', 'info')
    .runSynchronously()
    .getStdout();

  const sanitizeStdout = () => {
    const data = JSON.parse(stdout);
    if (data.data === undefined) {
      // yarn updated how they return data from yarn workspaces info --json, this is to support 1.22.0
      return data;
    }
    // This is how the data has to be parsed prior to 1.22.0
    return JSON.parse(data.data);
  };

  return sanitizeWorkspaces(sanitizeStdout());
}
