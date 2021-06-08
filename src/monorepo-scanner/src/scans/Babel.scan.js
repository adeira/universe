// @flow strict-local

import fs from 'fs';
import path from 'path';
import { Workspaces } from '@adeira/monorepo-utils';

Workspaces.iterateWorkspaces((packageJSONLocation) => {
  const packageJSON = require(packageJSONLocation);
  const workspacePath = path.dirname(packageJSONLocation);

  test(`${packageJSON.name}`, () => {
    // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
    expect(fs.existsSync(path.join(workspacePath, 'babel.config.js')) === false).toGiveHelp(
      `Your workspace ${packageJSON.name} contains file 'babel.config.js' but this file is only for monorepo roots. Use '.babelrc.js' file instead.`,
    );
  });
});
