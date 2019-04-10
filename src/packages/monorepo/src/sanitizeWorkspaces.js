// @flow

import path from 'path';

import type { WorkspaceDependencies } from './Workspaces.flow';

/**
 * We append here trailing slash to workspaces locations to distinguish
 * ambiguous paths when using regular expression matching. For example first
 * example here would match even the utils which is unexpected:
 *
 *  - src/packages/monorepo           << this case would match both lines
 *  - src/packages/monorepo-utils
 *
 * But this is no longer an issue whith trailing slash:
 *
 *  - src/packages/monorepo/
 *  - src/packages/monorepo-utils/
 */
export default function sanitizeWorkspaces(
  workspaceDependencies: WorkspaceDependencies,
): WorkspaceDependencies {
  const sanitizedWorkspaces = {};
  for (const [workspaceName, config] of Object.entries(workspaceDependencies)) {
    // $FlowIssue: https://github.com/facebook/flow/issues/2174
    const location = config.location;
    sanitizedWorkspaces[workspaceName] = {
      ...config,
      location: location.endsWith(path.sep) ? location : location + path.sep,
    };
  }
  return sanitizedWorkspaces;
}
