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

export function iterateWorkspaces(cb: (packageJSONLocation: string) => void) {
  const rootPackageJSON = findRootPackageJson();
  getWorkspaces(rootPackageJSON).forEach(workspace => {
    // src/apps        =>  src/apps/package.json
    // src/packages/*  =>  src/packages/*/package.json
    let workspaceGlobPattern;
    if (workspace.match(/\*$/)) {
      workspaceGlobPattern = workspace.replace(/\*$/, '*/package.json');
    } else {
      workspaceGlobPattern = workspace + '/package.json';
    }

    const packageJSONLocations = glob.sync(workspaceGlobPattern, {
      absolute: true,
    });

    packageJSONLocations.forEach(packageJSONLocation => {
      cb(packageJSONLocation);
    });
  });
}

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
