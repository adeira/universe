// @flow

import path from 'path';
import { Workspaces } from '@kiwicom/monorepo';

describe('all workspaces', () => {
  Workspaces.iterateWorkspaces(packageJSONLocation => {
    test(packageJSONLocation, () => {
      // $FlowAllowDynamicImport
      const packageJson = require(packageJSONLocation);
      expect(packageJson.private).not.toBeUndefined();

      if (packageJson.private === false) {
        expect(packageJson.description).not.toBeUndefined();

        // We currently have only MIT packages.
        // https://docs.npmjs.com/files/package.json#license
        expect(packageJson.license).toBe('MIT');

        expect(packageJson.homepage).toMatch(
          new RegExp(
            `^(?:https://github\\.com/kiwicom/.+|https://gitlab.skypicker.com/incubator/universe/tree/master/src/packages/${path.basename(
              path.dirname(packageJSONLocation),
            )})$`,
          ),
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
