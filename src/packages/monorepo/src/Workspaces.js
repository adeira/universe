// @flow

import { invariant } from '@kiwicom/js';

import { globSync } from './glob';
import { findRootPackageJson } from './findRootPackageJson';

function __resolveWorkspaces(packageJSON: Object): $ReadOnlyArray<string> {
  if (Array.isArray(packageJSON.workspaces)) {
    return packageJSON.workspaces;
  } else if (Array.isArray(packageJSON.workspaces?.packages)) {
    return packageJSON.workspaces.packages;
  }
  throw new Error('Cannot find workspaces definition.');
}

module.exports = {
  __resolveWorkspaces,

  iterateWorkspaces(cb: (packageJSONLocation: string) => void): void {
    const rootPackageJSON = findRootPackageJson();
    __resolveWorkspaces(rootPackageJSON).forEach(workspace => {
      globSync(workspace + '/package.json', {
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
  ) {
    const rootPackageJSON = findRootPackageJson();
    const workspaces = __resolveWorkspaces(rootPackageJSON);
    const isWorkspaceDirectory = workspaces.some(workspaceGlob => {
      const workspaceRegexp = workspaceGlob.replace(/\/\*\*?/, '');
      return new RegExp(workspaceRegexp + '$').test(path);
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
        globSync(workspace + '/package.json', {
          absolute: true,
        }),
      );
    });
    return packageJSONLocations;
  },
};
