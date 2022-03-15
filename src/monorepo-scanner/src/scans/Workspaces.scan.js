// @flow

import fs from 'fs';
import path from 'path';
import { Workspaces } from '@adeira/monorepo-utils';

Workspaces.iterateWorkspaces((packageJSONLocation) => {
  test(`${packageJSONLocation}`, () => {
    const packageJson = require(packageJSONLocation);

    if (packageJson.private !== true) {
      const packagePath = path.dirname(packageJSONLocation);
      ['README.md', 'LICENSE', '.npmignore'].forEach((requiredFilename) => {
        if (!fs.existsSync(path.join(packagePath, requiredFilename))) {
          throw new Error(`Package ${packageJson.name} is missing ${requiredFilename} file!`);
        }
      });
    }
  });
});
