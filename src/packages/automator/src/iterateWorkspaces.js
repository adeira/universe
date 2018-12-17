// @flow

import glob from 'glob';

import paths from '../../../../paths';

export default function iterateWorkspaces(
  cb: (packageJSONLocation: string) => void,
) {
  // $FlowAllowDynamicImport
  const rootPackageJSON = require(paths.rootPackageJSON);

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
