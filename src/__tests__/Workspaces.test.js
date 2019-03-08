// @flow

import { iterateWorkspaces } from '@kiwicom/monorepo';

import OSSPackages from '../open-source';

describe('all workspaces', () => {
  iterateWorkspaces(packageJSONLocation => {
    test(packageJSONLocation, () => {
      // $FlowAllowDynamicImport
      const packageJson = require(packageJSONLocation);
      expect(packageJson.private).not.toBeUndefined();

      if (packageJson.private === false) {
        expect(packageJson.description).not.toBeUndefined();

        // We currently have only MIT packages.
        // https://docs.npmjs.com/files/package.json#license
        expect(packageJson.license).toBe('MIT');

        if (OSSPackages.has(packageJson.name)) {
          expect(packageJson.homepage).toMatch(
            /^https:\/\/github\.com\/kiwicom\/.+$/,
          );
        } else {
          expect(packageJson.homepage).toMatch(
            /^https:\/\/gitlab\.skypicker\.com\/incubator\/universe\/tree\/master\/src\/packages\/.+$/,
          );
        }

        // each public package must specify `main` or `bin` field pe be useful
        expect(
          packageJson.main !== undefined || packageJson.bin !== undefined,
        ).toBe(true);
      } else {
        expect(packageJson.license).toBe('UNLICENSED');
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
