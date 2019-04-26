// @flow

import { Workspaces } from '@kiwicom/monorepo';

const PRIVATE_PACKAGES = [
  // The following packages should be never exposed on NPM because they
  // contain private or project specific code or it doesn't make any sense.
  '@kiwicom/environment',
  '@kiwicom/monorepo-shipit',
];

test('all private packages should have private flag set forever', () => {
  expect.assertions(PRIVATE_PACKAGES.length);

  Workspaces.iterateWorkspaces(packageJSONLocation => {
    // $FlowAllowDynamicImport
    const packageJson = require(packageJSONLocation);

    if (PRIVATE_PACKAGES.includes(packageJson.name)) {
      expect(packageJson.private).toBe(true);
    }
  });
});
