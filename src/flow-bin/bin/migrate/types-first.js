// @flow

/* eslint-disable no-console */

import { ShellCommand } from '@adeira/monorepo-utils';

import walk from './utils/walk';

export default function typesFirst(flowPath: string, typesFirstPath: string) {
  walk(typesFirstPath, (file) => {
    console.log('🔷 %s', file);
    new ShellCommand(null, flowPath, 'autofix', 'exports', '--in-place', '--force', file)
      .setOutputToScreen()
      .runSynchronously();
  });
}
