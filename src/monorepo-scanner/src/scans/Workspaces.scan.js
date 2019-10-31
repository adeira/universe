// @flow

import fs from 'fs';
import path from 'path';
import { Workspaces } from '@kiwicom/monorepo-utils';

Workspaces.iterateWorkspaces(packageJSONLocation => {
  test(packageJSONLocation, () => {
    // $FlowAllowDynamicImport
    const packageJson = require(packageJSONLocation);
    expect(packageJson.private).not.toBeUndefined();

    // Packages 'eslint-plugin-*' are the only exception since it wasn't
    // possible to have scoped packages in Eslint. Dunno if it's possible now.
    expect(
      /^@kiwicom\/.+|eslint-plugin-.+|^@adeira\/.+/.test(packageJson.name) === true,
    ).toGiveHelp(
      `All packages in our monorepo must start with '@kiwicom/' prefix. This name is not valid: ${packageJson.name}`,
    );

    if (packageJson.main !== undefined) {
      // We could in theory limit this case only for cases when MJS files are actually going to be
      // generated. This seems to be easier and it's not wrong.
      expect(packageJson.main.endsWith('.js') === false).toGiveHelp(
        "Field 'main' cannot have extension because it prevents MJS files from working correctly when used together.",
      );
    }

    if (packageJson.private === false) {
      expect(packageJson.description).not.toBeUndefined();

      // We currently have only MIT packages.
      // https://docs.npmjs.com/files/package.json#license
      expect(packageJson.license).toBe('MIT');

      expect(packageJson.homepage).toMatch(
        new RegExp(
          `^(?:https://github\\.com/kiwicom/.+|https://gitlab.skypicker.com/incubator/universe/tree/master/src/.+/${path.basename(
            path.dirname(packageJSONLocation),
          )}|https://github.com/adeira/universe/.+)$`,
        ),
      );

      // each public package must specify `main` or `bin` field to be useful
      expect(packageJson.main !== undefined || packageJson.bin !== undefined).toBe(true);

      const packagePath = path.dirname(packageJSONLocation);
      ['README.md', 'LICENSE', '.npmignore'].forEach(requiredFilename => {
        if (!fs.existsSync(path.join(packagePath, requiredFilename))) {
          throw new Error(`Package ${packageJson.name} is missing ${requiredFilename} file!`);
        }
      });
    }

    expect(packageJson.version).not.toBeUndefined();

    // there must be empty dependencies or devDependencies key ({} is enough)
    expect(
      packageJson.dependencies !== undefined || packageJson.devDependencies !== undefined,
    ).toBe(true);

    const dependencies = Object.entries(packageJson.dependencies ?? {}).concat(
      Object.entries(packageJson.devDependencies ?? {}),
    );

    dependencies.forEach(([dependency, value]) => {
      const version = typeof value === 'string' ? value : '^';
      if (!/^(?:[~^]?[0-9]+(?:\.[0-9]+){2}|http.+|\.\/[a-zA-Z0-9-_/.]+\.tgz)/.test(version)) {
        // this is necessary because we repeatedly released package without
        // bumped dependency version which made the released package broken
        // (we should probably use tilde ranges for our workspace deps though)
        throw new Error(
          `Please be more explicit about the required versions inside monorepo. Package ${packageJson.name} required dependency ${dependency} with version: ${version}`,
        );
      }
    });
  });
});
