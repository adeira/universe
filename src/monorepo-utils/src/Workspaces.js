// @flow strict-local

import { globSync } from './glob';
import { findRootPackageJson } from './findRootPackageJson';

type MinimalPackageJSON = {
  +workspaces?:
    | $ReadOnlyArray<string>
    | { +packages: $ReadOnlyArray<string>, +nohoist: $ReadOnlyArray<string> },
  ...
};

function __resolveWorkspaces(packageJSON: MinimalPackageJSON): $ReadOnlyArray<string> {
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
  iterateWorkspaces(cb: (packageJSONLocation: string) => void | Promise<void>): void {
    const rootPackageJSON = findRootPackageJson();
    __resolveWorkspaces(rootPackageJSON).forEach((workspace) => {
      globSync(`${workspace}/package.json`, {
        absolute: true,
      }).forEach((packageJSONLocation) => {
        /* $FlowFixMe[unused-promise] This comment suppresses an error when
         * upgrading Flow to version 0.201.0. To see the error delete this
         * comment and run Flow. */
        cb(packageJSONLocation);
      });
    });
  },

  getWorkspacesSync(baseDirectory: string = __dirname): $ReadOnlyArray<string> {
    // used only in `.jest.config.js` where it's not possible to be async
    const rootPackageJSON = findRootPackageJson(baseDirectory);
    let packageJSONLocations: $ReadOnlyArray<string> = [];
    __resolveWorkspaces(rootPackageJSON).forEach((workspace) => {
      packageJSONLocations = packageJSONLocations.concat(
        globSync(`${workspace}/package.json`, {
          absolute: true,
        }),
      );
    });
    return packageJSONLocations;
  },
};
