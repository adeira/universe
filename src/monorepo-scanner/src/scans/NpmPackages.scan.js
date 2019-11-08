// @flow

import { Workspaces, findMonorepoRoot } from '@adeira/monorepo-utils';
import path from 'path';

const workspaceLocations = Workspaces.getWorkspacesSync();
const workspaceMap = new Map();
const root = findMonorepoRoot();

for (const workspaceLocation of workspaceLocations) {
  // $FlowAllowDynamicImport
  const packageJson = require(workspaceLocation);
  workspaceMap.set(packageJson.name, packageJson);
}

// $FlowAllowDynamicImport
const npmPackages = require(path.join(root, 'scripts', 'publishedPackages.json'));

for (const npmPackage of npmPackages) {
  test(`${npmPackage} has private false flag`, () => {
    const packageJson = workspaceMap.get(npmPackage);
    expect(packageJson !== undefined).toGiveHelp(
      'You are trying to release a non existing package',
    );
    expect(packageJson?.private).toBe(false);
  });
}
