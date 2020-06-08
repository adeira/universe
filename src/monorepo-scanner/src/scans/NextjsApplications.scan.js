// @flow strict-local

import fs from 'fs';
import path from 'path';
import { Workspaces } from '@adeira/monorepo-utils';

Workspaces.iterateWorkspaces((packageJSONLocation) => {
  // $FlowAllowDynamicImport
  const packageJSON = require(packageJSONLocation);
  const workspaceLocation = path.dirname(packageJSONLocation);
  const dependencies = packageJSON.dependencies;
  const appName = packageJSON.name;

  // Check Babel config of Next.js
  if (dependencies?.next !== undefined) {
    const babelRCFile = '.babelrc.js';
    const babelRCLocation = path.join(workspaceLocation, babelRCFile);

    test(`${babelRCLocation}`, () => {
      expect(fs.existsSync(babelRCLocation)).toGiveHelp(
        `Your Next.js application ${appName} should contain '${babelRCFile}' file in the workspace root.`,
      );

      // $FlowAllowDynamicImport
      const babelRC = require(babelRCLocation);

      expect(babelRC.presets.includes('@adeira/babel-preset-adeira')).toGiveHelp(
        `Your Next.js application ${appName} should contain '${babelRCFile}' file with '@adeira/babel-preset-adeira' preset.`,
      );

      expect(babelRC.presets.includes('next/babel')).toGiveHelp(
        `Your Next.js application ${appName} should contain '${babelRCFile}' file with 'next/babel' preset.`,
      );

      expect(
        babelRC.presets.indexOf('next/babel') >
          babelRC.presets.indexOf('@adeira/babel-preset-adeira'),
      ).toGiveHelp(
        `Preset 'next/babel' should be defined AFTER '@adeira/babel-preset-adeira' (${appName}).`,
      );
    });
  }
});
