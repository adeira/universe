// @flow

import path from 'path';
import isCI from 'is-ci';
import { ShellCommand, findMonorepoRoot } from '@kiwicom/monorepo-utils';
import logger from '@kiwicom/logger';

const monorepoRoot = findMonorepoRoot();
const flowBin = path.join(monorepoRoot, 'node_modules', '.bin', 'flow');

function command(...commandChunks): ShellCommand {
  const command = [flowBin, ...commandChunks];
  logger.log(command.map(chunk => chunk.replace(monorepoRoot, '/')).join(' '));
  return new ShellCommand(monorepoRoot, ...command).setOutputToScreen();
}

export default class FlowWrapper {
  static restartServer = (): void => {
    command('stop').runSynchronously();
  };

  static startServer = (runAll: boolean = false): void => {
    command(
      'start',
      '--wait-for-recheck=true',
      `--lazy-mode=${runAll ? 'none' : 'fs'}`,
      `--saved-state-fetcher=${runAll ? 'none' : 'local'}`,
      '--saved-state-no-fallback',
      // This option will take '.flow.saved_state_file_changes' into account and perform startup recheck.
      // This way we can uncover already existing errors (otherwise lazy mode starts with 0 files).
      '--saved-state-force-recheck',
    )
      .setNoExceptions() // server might be already running
      .runSynchronously();
  };

  static forceRecheck = (inputFile: string): void => {
    command('force-recheck', '--focus', `--input-file=${inputFile}`).runSynchronously();
  };

  static checkSatus = (): number => {
    return command(
      'status',
      ...(isCI
        ? [
            '--max-warnings=0', // because of our lint rollouts
            '--color=always',
          ]
        : [
            // warnings are allowed on localhost since they may appear randomly because of our rollouts
            '--color=auto',
          ]),
    )
      .setNoExceptions()
      .runSynchronously()
      .getExitCode();
  };

  static saveState = (savedStatePath: string): void => {
    command('save-state', `--root=${monorepoRoot}`, `--out=${savedStatePath}`).runSynchronously();
  };
}
