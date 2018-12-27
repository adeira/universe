// @flow

import { iterateWorkspaces } from '@kiwicom/monorepo';

describe('all workspaces', () => {
  iterateWorkspaces(packageJSONLocation => {
    test(packageJSONLocation, () => {
      // $FlowAllowDynamicImport
      const packageJson = require(packageJSONLocation);
      expect(packageJson.private).not.toBeUndefined();

      if (packageJson.private === false) {
        expect(packageJson.description).not.toBeUndefined();
        expect(packageJson.homepage).toMatch(
          // we should eventually point to GitHub repo when exported
          /^https:\/\/gitlab\.skypicker\.com\/graphql\/graphql\/tree\/master\/src\/packages\/.*/,
        );

        // each public package must specify `main` or `bin` field pe be useful
        expect(
          packageJson.main !== undefined || packageJson.bin !== undefined,
        ).toBe(true);
      }

      expect(packageJson.version).not.toBeUndefined();

      // there must be empty dependencies or devDependencies key ({} is enough)
      expect(
        packageJson.dependencies !== undefined ||
          packageJson.devDependencies !== undefined,
      ).toBe(true);
    });
  });
});
