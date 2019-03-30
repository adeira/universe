// @flow

import path from 'path';
import { Workspaces } from '@kiwicom/monorepo';

const PRIVATE_PACKAGES = [
  // following package(s) should be never exposed on NPM because they
  // contain private or project specific code
  '@kiwicom/environment',
];

test('all private packages should have private flag set forever', () => {
  expect.assertions(PRIVATE_PACKAGES.length);

  Workspaces.iterateWorkspacesInPath(
    path.join(__dirname, '..'),
    packageJSONLocation => {
      // $FlowAllowDynamicImport
      const packageJson = require(packageJSONLocation);

      if (PRIVATE_PACKAGES.includes(packageJson.name)) {
        expect(packageJson.private).toBe(true);
      }
    },
  );
});
