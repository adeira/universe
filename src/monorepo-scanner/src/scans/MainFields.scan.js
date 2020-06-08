// @flow

import fs from 'fs';
import path from 'path';
import { Workspaces } from '@adeira/monorepo-utils';

Workspaces.iterateWorkspaces((packageJSONLocation) => {
  // $FlowAllowDynamicImport
  const packageJson = require(packageJSONLocation);
  test(`${packageJson.name}`, () => {
    const dirname = path.dirname(packageJSONLocation);
    const main = packageJson.main;
    if (main != null) {
      expect(fs.existsSync(path.join(dirname, `${main}.js`))).toGiveHelp(
        'The file specified in main field does not exist. If this is intentional, you can remove this field from package json',
      );
    }

    if (packageJson.module != null && packageJson.module !== false) {
      expect(fs.existsSync(path.join(dirname, packageJson.module))).toGiveHelp(
        'The file specified in module field does not exist. If this is intentional, you can remove this field from package json',
      );
    }

    if (packageJson.browser != null) {
      expect(fs.existsSync(path.join(dirname, packageJson.browser))).toGiveHelp(
        'The file specified in browser field does not exist. If this is intentional, you can remove this field from package json',
      );
    }
  });
});
