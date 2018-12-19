// @flow

import { iterateWorkspaces } from '@kiwicom/monorepo';

describe('all NPM package.json files', () => {
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

      expect(packageJson.name).toMatch(
        /^(@kiwicom\/.+|eslint-plugin-kiwi-graphql)/,
      );
      expect(packageJson.version).not.toBeUndefined();

      // there must be at least empty dependencies (or devDependencies) key
      // otherwise eslint rule for `import/no-extraneous-dependencies`
      // won't work ({} is enough)
      expect(
        packageJson.dependencies !== undefined ||
          packageJson.devDependencies !== undefined,
      ).toBe(true);
    });
  });
});
