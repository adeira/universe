// @flow strict-local

import { globAsync, globSync } from './glob';
import { findRootPackageJson } from './findRootPackageJson';

type PackageJSON = {|
  +workspaces?:
    | $ReadOnlyArray<string>
    | {| +packages: $ReadOnlyArray<string>, +nohoist: $ReadOnlyArray<string> |},
|};

function __resolveWorkspaces(packageJSON: PackageJSON): $ReadOnlyArray<string> {
  const workspaces = packageJSON.workspaces;
  if (Array.isArray(workspaces)) {
    return workspaces;
  } else if (workspaces && Array.isArray(workspaces.packages)) {
    return workspaces.packages;
  }
  throw new Error('Cannot find workspaces definition.');
}

/**
 * TODO: Rework this to return promise. It's a bit awkward that these iterate*
 *       methods return void instead of Promise so it's really difficult to
 *       perform some action after the iteration (after all).
 */
module.exports = {
  __resolveWorkspaces,

  /**
   * @deprecated Use `getWorkspacesAsync` or `getWorkspacesSync` instead.
   */
  iterateWorkspaces(
    cb: (packageJSONLocation: string) => void | Promise<void>,
  ): void {
    const rootPackageJSON = findRootPackageJson();
    __resolveWorkspaces(rootPackageJSON).forEach(workspace => {
      globSync(`${workspace}/package.json`, {
        absolute: true,
      }).forEach(packageJSONLocation => {
        cb(packageJSONLocation);
      });
    });
  },

  getWorkspacesAsync(
    baseDirectory: string = __dirname,
  ): Promise<$ReadOnlyArray<string>> {
    const rootPackageJSON = findRootPackageJson(baseDirectory);
    const workspaces = __resolveWorkspaces(rootPackageJSON);
    const workspacePromises = workspaces.map(workspace => {
      return globAsync(`${workspace}/package.json`, {
        absolute: true,
      });
    });
    return Promise.all(workspacePromises).then(packageJSONLocations => {
      // $FlowIssue: https://github.com/facebook/flow/issues/7397
      return packageJSONLocations.flat();
    });
  },

  getWorkspacesSync(baseDirectory: string = __dirname): $ReadOnlyArray<string> {
    // used only in `.jest.config.js` where it's not possible to be async
    const rootPackageJSON = findRootPackageJson(baseDirectory);
    let packageJSONLocations = [];
    __resolveWorkspaces(rootPackageJSON).forEach(workspace => {
      packageJSONLocations = packageJSONLocations.concat(
        globSync(`${workspace}/package.json`, {
          absolute: true,
        }),
      );
    });
    return packageJSONLocations;
  },
};
