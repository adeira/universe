// @flow strict-local

import fs from 'fs';
import os from 'os';
import path from 'path';
import { ShellCommand } from '@adeira/monorepo-utils';
import logger from '@adeira/logger';

import RepoGit from '../RepoGit';
import ShipitConfig from '../ShipitConfig';

/**
 * This phase verifies integrity of the exported repository. This does so by
 * following these steps:
 *
 * 1) It exports every project from monorepo and filters it. This way we'll get
 *    fresh state of the project.
 * 2) It adds exported remote and compares these two repositories.
 *
 * There should not be any differences if everything goes well. Otherwise it
 * means that either source and destination are out of sync or there is a bug
 * in Shipit project.
 */
export default function createVerifyRepoPhase(config: ShipitConfig): () => void {
  function createNewEmptyRepo(path: string) {
    new ShellCommand(path, 'git', 'init').runSynchronously();
    const repo = new RepoGit(path);
    repo.configure();
    return repo;
  }

  function getDirtyExportedRepoPath() {
    return fs.mkdtempSync(path.join(os.tmpdir(), 'adeira-shipit-verify-dirty-'));
  }

  function getFilteredExportedRepoPath() {
    return fs.mkdtempSync(path.join(os.tmpdir(), 'adeira-shipit-verify-filtered-'));
  }

  const monorepoPath = config.sourcePath;

  const phase = function () {
    const dirtyExportedRepoPath = getDirtyExportedRepoPath();
    const dirtyExportedRepo = createNewEmptyRepo(dirtyExportedRepoPath);

    const monorepo = new RepoGit(monorepoPath);
    monorepo.export(dirtyExportedRepoPath, config.getSourceRoots());

    new ShellCommand(dirtyExportedRepoPath, 'git', 'add', '.', '--force').runSynchronously();

    new ShellCommand(
      dirtyExportedRepoPath,
      'git',
      'commit',
      '-m',
      'Initial filtered commit',
    ).runSynchronously();

    const dirtyChangeset = dirtyExportedRepo.getChangesetFromID('HEAD');
    const filter = config.getDefaultShipitFilter();
    const filteredChangeset = filter(dirtyChangeset).withSubject('Initial filtered commit');

    const filteredRepoPath = getFilteredExportedRepoPath();
    const filteredRepo = createNewEmptyRepo(filteredRepoPath);
    filteredRepo.commitPatch(filteredChangeset);

    new ShellCommand(
      filteredRepoPath,
      'git',
      'remote',
      'add',
      'shipit_destination',
      config.destinationPath, // notice we don't use URL here but locally updated repo instead
    ).runSynchronously();

    new ShellCommand(filteredRepoPath, 'git', 'fetch', 'shipit_destination').runSynchronously();

    const diffStats = new ShellCommand(
      filteredRepoPath,
      'git',
      '--no-pager',
      'diff',
      '--stat',
      'HEAD',
      'shipit_destination/master',
    )
      .runSynchronously()
      .getStdout()
      .trim();

    if (diffStats !== '') {
      const diff = new ShellCommand(
        filteredRepoPath,
        'git',
        'diff',
        '--full-index',
        '--binary',
        '--no-color',
        'shipit_destination/master',
        'HEAD',
      )
        .runSynchronously()
        .getStdout();
      logger.error(diff);
      throw new Error('❌ Repository is out of SYNC!');
    }
  };

  phase.readableName = 'Verify integrity of the repository';
  return phase;
}
