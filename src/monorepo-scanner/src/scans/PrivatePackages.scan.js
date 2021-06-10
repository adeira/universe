// @flow

import { Workspaces } from '@adeira/monorepo-utils';

// TODO: change to explicitly whitelisted projects?
const PRIVATE_PACKAGES = [
  // The following packages should be never exposed on NPM because they contain private or
  // project specific code or it doesn't make any sense. Some of them also cannot be published
  // because their implementation is closely bounded to Universe infra (see Shipit).
  /^@adeira\/abacus-backoffice$/,
  /^@adeira\/abacus-kochka$/,
  /^@adeira\/docs$/,
  /^@adeira\/example-relay$/,
  /^@adeira\/monorepo-scanner$/,
  /^@adeira\/monorepo-shipit$/,
  /^@adeira\/sx-tailwind-website$/,
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
  Workspaces.iterateWorkspaces((packageJSONLocation) => {
    const packageJson = require(packageJSONLocation);

    // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
    expect(violatesBlacklist(packageJson) === false).toGiveHelp(
      `Package '${packageJson.name}' is blacklisted for publishing on NPM. Please change the project visibility to private:true in package.json.`,
    );
  });
});
