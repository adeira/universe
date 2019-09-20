// @flow

import chalk from 'chalk';
import path from 'path';
import isCI from 'is-ci';
import { ShellCommand, findMonorepoRoot } from '@kiwicom/monorepo-utils';
import logger from '@kiwicom/logger';

const monorepoRoot = findMonorepoRoot();
const flowBin = path.join(monorepoRoot, 'node_modules', '.bin', 'flow');

function hideRoot(string) {
  return string.replace(new RegExp(monorepoRoot, 'g'), chalk.italic('<PROJECT_ROOT>'));
}

function command(...commandChunks): ShellCommand {
  const [flowBinCommand, ...rest] = commandChunks;
  logger.log(
    chalk.bold.green('flow'),
    chalk.bold.green(flowBinCommand),
    ...rest.map(c => chalk.dim(hideRoot(c))),
  );
  return new ShellCommand(monorepoRoot, flowBin, ...commandChunks).setOutputToScreen();
}

export default class FlowWrapper {
  static restartServer = (): void => {
    command('stop').runSynchronously();
  };

  static startServer = (runAll: boolean = false): void => {
    const commandOptions = [
      '--wait-for-recheck=true',
      `--lazy-mode=${runAll ? 'none' : 'fs'}`,
      `--saved-state-fetcher=${runAll ? 'none' : 'local'}`,
      '--saved-state-no-fallback',
      // This option will take '.flow.saved_state_file_changes' into account and perform startup recheck.
      // This way we can uncover already existing errors (otherwise lazy mode starts with 0 files).
      '--saved-state-force-recheck',
    ];

    if (isCI) {
      // We disable warnings only on CI because some warnings can be visible locally because of lint rollouts.
      // Why "0" warnings by default? It's because we use them to check that flowtests work correctly. Important!
      commandOptions.push('--max-warnings=0');
    }

    command('start', ...commandOptions)
      .setNoExceptions() // server might be already running
      .runSynchronously();
  };

  static forceRecheck = (inputFile: string): void => {
    command('force-recheck', '--focus', `--input-file=${inputFile}`).runSynchronously();
  };

  static checkSatus = (): number => {
    return command('status', `--color=${isCI ? 'always' : 'auto'}`)
      .setNoExceptions()
      .runSynchronously()
      .getExitCode();
  };

  static saveState = (savedStatePath: string): void => {
    command('save-state', `--root=${monorepoRoot}`, `--out=${savedStatePath}`).runSynchronously();
  };
}
