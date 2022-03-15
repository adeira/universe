// @flow

import fs from 'fs';
import path from 'path';
import { Workspaces } from '@adeira/monorepo-utils';

Workspaces.iterateWorkspaces((packageJSONLocation) => {
  const packageJson = require(packageJSONLocation);
  test(`${packageJson.name}`, () => {
    const dirname = path.dirname(packageJSONLocation);
    const main = packageJson.main;

    if (main != null) {
      const mainEntrypoint = path.join(dirname, main);
      // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
      expect(fs.existsSync(mainEntrypoint)).toGiveHelp(
        `The file specified in main field does not exist (${mainEntrypoint}). If this is intentional, you can remove this field from package.json`,
      );
    }
  });
});
