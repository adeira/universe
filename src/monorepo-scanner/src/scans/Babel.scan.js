// @flow strict-local

import fs from 'fs';
import path from 'path';
import { Workspaces } from '@adeira/monorepo-utils';

Workspaces.iterateWorkspaces(packageJSONLocation => {
  // $FlowAllowDynamicImport
  const packageJSON = require(packageJSONLocation);
  const workspacePath = path.dirname(packageJSONLocation);

  test(`${packageJSON.name}`, () => {
    expect(fs.existsSync(path.join(workspacePath, '.babelrc')) === false).toGiveHelp(
      `Your workspace ${packageJSON.name} contains file '.babelrc' but it should have '.babelrc.js' file instead.`,
    );

    expect(fs.existsSync(path.join(workspacePath, 'babel.config.js')) === false).toGiveHelp(
      `Your workspace ${packageJSON.name} contains file 'babel.config.js' but this file is only for monorepo roots. Use '.babelrc.js' file instead.`,
    );
  });
});
