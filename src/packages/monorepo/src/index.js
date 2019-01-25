// @flow

import glob from 'glob';
import { invariant } from '@mrtnzlml/utils';

import {
  findRootPackageJson,
  findRootPackageJsonPath,
} from './findRootPackageJson';
import { runTests } from './TestsRunner';
import { getWorktreeChangedFiles } from './getChangedFiles';

export {
  findRootPackageJson,
  findRootPackageJsonPath,
  getWorktreeChangedFiles,
  runTests as unstable_runTests, // eslint-disable-line babel/camelcase
};

export function iterateWorkspaces(cb: (packageJSONLocation: string) => void) {
  const rootPackageJSON = findRootPackageJson();
  rootPackageJSON.workspaces.forEach(workspace => {
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
  const workspaces = rootPackageJSON.workspaces;
  const isWorkspaceDirectory = workspaces.some(workspace => {
    return new RegExp(workspace + '$').test(path);
  });

  invariant(
    isWorkspaceDirectory === true,
    `Path ${path} is not workspace directory. It must be one of: ${workspaces}`,
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
