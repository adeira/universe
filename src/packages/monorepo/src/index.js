// @flow

import glob from 'glob';
import { invariant } from '@kiwicom/js';

import {
  findRootPackageJson,
  findRootPackageJsonPath,
} from './findRootPackageJson';
import { runTests } from './TestsRunner';
import Git from './Git';

export {
  Git,
  findRootPackageJson,
  findRootPackageJsonPath,
  runTests as unstable_runTests, // eslint-disable-line babel/camelcase
};

function getWorkspaces(packageJSON: Object): $ReadOnlyArray<string> {
  if (Array.isArray(packageJSON.workspaces)) {
    return packageJSON.workspaces;
  } else if (Array.isArray(packageJSON.workspaces.packages)) {
    return packageJSON.workspaces.packages;
  }
  throw new Error('Cannot find workspaces definition.');
}

// src/apps        =>  src/apps/package.json
// src/packages/*  =>  src/packages/*/package.json
function expandWorkspaceGlob(originalGlob: string): string {
  let expandedGlob;
  if (originalGlob.match(/\*$/)) {
    expandedGlob = originalGlob.replace(/\*$/, '*/package.json');
  } else {
    expandedGlob = originalGlob + '/package.json';
  }
  return expandedGlob;
}

/**
 * @deprecated Use `getWorkspacesSync()` instead.
 */
export function iterateWorkspaces(
  cb: (packageJSONLocation: string) => void,
): void {
  const rootPackageJSON = findRootPackageJson();
  getWorkspaces(rootPackageJSON).forEach(workspace => {
    const workspaceGlobPattern = expandWorkspaceGlob(workspace);
    glob
      .sync(workspaceGlobPattern, {
        absolute: true,
      })
      .forEach(packageJSONLocation => {
        cb(packageJSONLocation);
      });
  });
}

export function getWorkspacesSync(): $ReadOnlyArray<string> {
  const rootPackageJSON = findRootPackageJson();
  let packageJSONLocations = [];
  getWorkspaces(rootPackageJSON).forEach(workspace => {
    const workspaceGlobPattern = expandWorkspaceGlob(workspace);
    packageJSONLocations = packageJSONLocations.concat(
      glob.sync(workspaceGlobPattern, {
        absolute: true,
      }),
    );
  });
  return packageJSONLocations;
}

/**
 * @deprecated
 */
export function iterateWorkspacesInPath(
  path: string,
  cb: (packageJSONLocation: string) => void,
) {
  const rootPackageJSON = findRootPackageJson();
  const workspaces = getWorkspaces(rootPackageJSON);
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
}
