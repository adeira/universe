// @flow

import os from 'os';
import semver from 'semver';

import sanitizeWorkspaces from './sanitizeWorkspaces';
import ShellCommand from './ShellCommand';
import type { WorkspaceDependencies } from './Workspaces.flow';

/**
 * This function returns the workspace dependencies
 */
export default function getWorkspaceDependencies(): WorkspaceDependencies {
  const versionStdout = new ShellCommand(null, 'yarn', '--version').runSynchronously().getStdout();

  // branch for Yarn Berry (v2+):
  if (semver.gte(versionStdout, '2.0.0')) {
    const sanitizeStdout = (stdout) => {
      const workspaces = {};
      const rows = stdout.split(os.EOL);
      for (const row of rows) {
        const parsedRow = JSON.parse(row);
        if (parsedRow.name) {
          workspaces[parsedRow.name] = {
            location: parsedRow.location,
            workspaceDependencies: parsedRow.workspaceDependencies,
            mismatchedWorkspaceDependencies: parsedRow.mismatchedWorkspaceDependencies,
          };
        }
      }
      return workspaces;
    };

    const stdout = new ShellCommand(null, 'yarn', 'workspaces', 'list', '--verbose', '--json')
      .runSynchronously()
      .getStdout();

    return sanitizeWorkspaces(sanitizeStdout(stdout.trim()));
  }

  // Yarn Classic (v1.*):
  const sanitizeStdout = (stdout) => {
    const data = JSON.parse(stdout);
    return JSON.parse(data.data);
  };

  const stdout = new ShellCommand(null, 'yarn', '--json', 'workspaces', 'info')
    .runSynchronously()
    .getStdout();

  return sanitizeWorkspaces(sanitizeStdout(stdout.trim()));
}
