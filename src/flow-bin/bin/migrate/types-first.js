// @flow

/* eslint-disable no-console */

import { ShellCommand } from '@adeira/monorepo-utils';

import walk from './utils/walk';

// https://flow.org/en/docs/cli/annotate-exports/
export default function typesFirst(flowPath: string, typesFirstPath: string) {
  walk(typesFirstPath, (file) => {
    console.log('🔷 %s', file);
    new ShellCommand(
      null,
      flowPath,
      'codemod',
      'annotate-exports',
      '--write',
      '--repeat',
      '--log-level=info',
      file,
    )
      .setOutputToScreen()
      .runSynchronously();
  });
}
