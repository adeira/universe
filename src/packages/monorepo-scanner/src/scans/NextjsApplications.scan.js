// @flow strict-local

import fs from 'fs';
import path from 'path';
import { Workspaces } from '@kiwicom/monorepo';

Workspaces.iterateWorkspaces(packageJSONLocation => {
  // $FlowAllowDynamicImport
  const packageJSON = require(packageJSONLocation);
  const workspaceLocation = path.dirname(packageJSONLocation);
  const dependencies = packageJSON.dependencies;
  const appName = packageJSON.name;

  // Check Babel config of Next.js
  if (dependencies?.next !== undefined) {
    const babelRCLocation = path.join(workspaceLocation, '.babelrc');

    test(babelRCLocation, () => {
      expect(fs.existsSync(babelRCLocation)).toGiveHelp(
        `Your Next.js application ${appName} should contain '.babelrc' file in the workspace root.`,
      );

      const babelRC = JSON.parse(
        fs.readFileSync(babelRCLocation, {
          encoding: 'utf8',
        }),
      );

      expect(
        babelRC.presets.includes('@kiwicom/babel-preset-kiwicom'),
      ).toGiveHelp(
        `Your Next.js application ${appName} should contain '.babelrc' file with '@kiwicom/babel-preset-kiwicom' preset.`,
      );

      expect(babelRC.presets.includes('next/babel')).toGiveHelp(
        `Your Next.js application ${appName} should contain '.babelrc' file with 'next/babel' preset.`,
      );

      expect(
        babelRC.presets.indexOf('next/babel') >
          babelRC.presets.indexOf('@kiwicom/babel-preset-kiwicom'),
      ).toGiveHelp(
        `Preset 'next/babel' should be defined AFTER '@kiwicom/babel-preset-kiwicom' (${appName}).`,
      );
    });
  }
});
