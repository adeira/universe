// @flow

import { ShellCommand } from '@kiwicom/monorepo-utils';

export default function git(args: $ReadOnlyArray<string>) {
  return new ShellCommand(null, 'git', '--no-pager', ...args)
    .setOutputToScreen()
    .runSynchronously();
}
