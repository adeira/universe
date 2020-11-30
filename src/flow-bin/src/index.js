// @flow

import chalk from 'chalk';
import path from 'path';
import isCI from 'is-ci';
import { ShellCommand, findMonorepoRoot } from '@adeira/monorepo-utils';
import logger from '@adeira/logger';

export const root: string = (() => {
  try {
    return findMonorepoRoot();
  } catch {
    // In case it is not used in a monorepo, fallback to process.cwd
    return process.cwd();
  }
})();
const flowBin = path.join(root, 'node_modules', '.bin', 'flow');

function hideRoot(string) {
  return string.replace(new RegExp(root, 'g'), chalk.italic('<PROJECT_ROOT>'));
}

type FlowOptions = $ReadOnlyArray<string>;

function command(flowOptions: FlowOptions, ...commandChunks): ShellCommand {
  const [flowBinCommand, ...rest] = commandChunks;
  logger.log(
    chalk.bold.green('flow'),
    chalk.bold.green(flowBinCommand),
    ...flowOptions.map((c) => chalk.bold.dim(hideRoot(c))),
    ...rest.map((c) => chalk.italic.dim(hideRoot(c))),
  );
  return new ShellCommand(root, flowBin, flowBinCommand, ...flowOptions, ...rest);
}

export default class FlowWrapper {
  static restartServer(flowOptions: FlowOptions): void {
    command(flowOptions, 'stop').setOutputToScreen().runSynchronously();
  }

  static startServerSilently(flowOptions: FlowOptions, runAll: boolean = false): void {
    command(
      flowOptions,
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
  }

  static forceRecheck(flowOptions: FlowOptions, inputFile: string): void {
    command(flowOptions, 'force-recheck', '--focus', `--input-file=${inputFile}`)
      .setOutputToScreen()
      .runSynchronously();
  }

  static checkStatus(flowOptions: FlowOptions): number {
    return command(
      flowOptions,
      'status',
      `--color=${isCI ? 'always' : 'auto'}`,
      // Why "0" warnings by default? It's because we use them to check that flowtests work correctly. Important!
      '--max-warnings=0',
    )
      .setOutputToScreen()
      .setNoExceptions()
      .runSynchronously()
      .getExitCode();
  }

  static saveState(flowOptions: FlowOptions, savedStatePath: string): void {
    command(flowOptions, 'save-state', `--root=${root}`, `--out=${savedStatePath}`)
      .setOutputToScreen()
      .runSynchronously();
  }
}
