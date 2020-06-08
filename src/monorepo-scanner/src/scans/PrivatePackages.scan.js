// @flow

import { Workspaces } from '@adeira/monorepo-utils';

// TODO: change to explicitly whitelisted projects?
const PRIVATE_PACKAGES = [
  // The following packages should be never exposed on NPM because they contain private or
  // project specific code or it doesn't make any sense. Some of them also cannot be published
  // because their implementation is closely bounded to Universe infra (see Shipit).
  /^@kiwicom\/environment/,
  /^@kiwicom\/graphql$/,
  /^@kiwicom\/monorepo-scanner$/,
  /^@kiwicom\/monorepo-shipit$/,
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
