// @flow

import glob from 'glob';
import { invariant } from '@kiwicom/js';

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
      glob
        .sync(workspace + '/package.json', {
          absolute: true,
        })
        .forEach(packageJSONLocation => {
          cb(packageJSONLocation);
        });
    });
  },

  iterateWorkspacesInPath(
    path: string,
    cb: (packageJSONLocation: string) => void,
  ) {
    const rootPackageJSON = findRootPackageJson();
    const workspaces = __resolveWorkspaces(rootPackageJSON);
    const isWorkspaceDirectory = workspaces.some(workspace => {
      return new RegExp(workspace + '$').test(path);
    });

    invariant(
      isWorkspaceDirectory === true,
      `Path ${path} is not workspace directory. It must be one of: ${workspaces.join(
        ', ',
      )}`,
    );

    const packageJSONLocations = glob.sync(
      path.replace(/\/?$/, '/*/package.json'),
      {
        absolute: true,
      },
    );

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
        glob.sync(workspace + '/package.json', {
          absolute: true,
        }),
      );
    });
    return packageJSONLocations;
  },
};
