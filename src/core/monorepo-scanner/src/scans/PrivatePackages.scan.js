// @flow

import { Workspaces } from '@kiwicom/monorepo-utils';

// TODO: change to explicitly whitelisted projects?
const PRIVATE_PACKAGES = [
  // The following packages should be never exposed on NPM because they
  // contain private or project specific code or it doesn't make any sense.
  /^@kiwicom\/environment/,
  /^@kiwicom\/graphql$/,
  /^@kiwicom\/monorepo-scanner$/,
];

function violatesBlacklist(packageJson): boolean {
  for (const packageRegexp of PRIVATE_PACKAGES) {
    if (packageRegexp.test(packageJson.name) === true && packageJson.private === false) {
      return true;
    }
  }
  return false;
}

test('all private packages should have private flag set forever', () => {
  Workspaces.iterateWorkspaces(packageJSONLocation => {
    // $FlowAllowDynamicImport
    const packageJson = require(packageJSONLocation);

    expect(violatesBlacklist(packageJson) === false).toGiveHelp(
      `Package '${packageJson.name}' is blacklisted for publishing on NPM. Please change the project visibility to private:true in package.json.`,
    );
  });
});
