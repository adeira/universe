// @flow strict-local

import { invariant } from '@kiwicom/js';

import { globSync } from './glob';
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

  /**
   * @deprecated Iterate over all workspaces, please.
   */
  iterateWorkspacesInPath(
    path: string,
    cb: (packageJSONLocation: string) => void | Promise<void>,
  ): void {
    const rootPackageJSON = findRootPackageJson();
    const workspaces = __resolveWorkspaces(rootPackageJSON);
    const isWorkspaceDirectory = workspaces.some(workspaceGlob => {
      const workspaceRegexp = workspaceGlob.replace(/\/\*\*?/, '');
      return new RegExp(`${workspaceRegexp}$`).test(path);
    });

    invariant(
      isWorkspaceDirectory === true,
      `Path ${path} is not workspace directory. It must be one of: ${workspaces.join(
        ', ',
      )}`,
    );

    const packageJSONLocations = globSync('/*/package.json', {
      root: path,
    });

    packageJSONLocations.forEach(packageJSONLocation => {
      cb(packageJSONLocation);
    });
  },

  getWorkspacesSync(): $ReadOnlyArray<string> {
    // used only in `.jest.config.js` where it's not possible to be async
    // TODO: use iterateWorkspaces (?)
    const rootPackageJSON = findRootPackageJson();
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
