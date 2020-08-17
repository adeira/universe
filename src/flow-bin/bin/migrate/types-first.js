// @flow

import { ShellCommand } from '@adeira/monorepo-utils';

// https://flow.org/en/docs/cli/annotate-exports/
export default function typesFirst(flowPath: string, typesFirstPath: string) {
  new ShellCommand(
    null,
    flowPath,
    'codemod',
    'annotate-exports',
    '--write',
    '--repeat',
    '--log-level=info',
    typesFirstPath,
  )
    .setOutputToScreen()
    .runSynchronously();
}
