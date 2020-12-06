// @flow

const { spawnSync } = require('child_process');

/**
 * This should probably have been a part of @adeira/monorepo-utils,
 * but it is difficult to make it run in next.config.js because of our setup.
 * Maybe when we have migrated to bazel, we can move this to monorepo-utils
 */
function getTranspileWorkspaces() /* : $ReadOnlyArray<string> */ {
  const workspaces = JSON.parse(
    JSON.parse(spawnSync('yarn', ['workspaces', '--json', 'info']).stdout.toString()).data,
  );

  const transpileWorkspaces = new Set();

  const getWorkspaces = (workspace = '@adeira/example-relay') => {
    for (const dependency of workspaces[workspace].workspaceDependencies) {
      transpileWorkspaces.add(dependency);
      getWorkspaces(dependency);
    }
  };

  getWorkspaces();
  return Array.from(transpileWorkspaces);
}

module.exports = getTranspileWorkspaces;
