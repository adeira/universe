// @flow

import sanitizeWorkspaces from './sanitizeWorkspaces';
import ShellCommand from './ShellCommand';
import type { WorkspaceDependencies } from './Workspaces.flow';

/**
 * This function returns the workspace dependenciesl
 */
export default function getWorkspaceDependencies(): WorkspaceDependencies {
  const stdout = new ShellCommand(null, 'yarn', 'workspaces', 'info', '--json')
    .runSynchronously()
    .getStdout();

  return sanitizeWorkspaces(JSON.parse(JSON.parse(stdout).data));
}
