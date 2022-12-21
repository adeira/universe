// @flow strict-local

import { ShellCommand } from '@adeira/shell-command';

import RepoGit, { type DestinationRepo, type SourceRepo } from '../RepoGit';
import Changeset from '../Changeset';
import ShipitConfig from '../ShipitConfig';

export default function createImportSyncPhase(
  config: ShipitConfig,
  packageName: string,
  pullRequestNumber: string,
): () => void {
  // TODO: make it Git independent

  function getFilteredChangesets(): Set<Changeset> {
    new ShellCommand(
      config.destinationPath,
      'git',
      'fetch',
      'origin',
      `refs/pull/${pullRequestNumber}/head`,
    ).runSynchronously();

    // 'git rev-parse FETCH_HEAD' to get actual hash
    const mergeBase = new ShellCommand(
      config.destinationPath,
      'git',
      'merge-base',
      'FETCH_HEAD',
      config.getDestinationBranch(),
    )
      .runSynchronously()
      .getStdout()
      .trim();

    const changesets = new Set<Changeset>();
    const exportedRepo: SourceRepo = new RepoGit(config.destinationPath);
    const descendantsPath = exportedRepo.findDescendantsPath(mergeBase, 'FETCH_HEAD', new Set([]));
    if (descendantsPath !== null) {
      descendantsPath.forEach((revision) => {
        const changeset = exportedRepo.getChangesetFromID(revision);
        const filter = config.getDefaultImportitFilter();
        changesets.add(filter(changeset));
      });
    }
    return changesets;
  }

  return function () {
    const monorepo: DestinationRepo = new RepoGit(config.sourcePath);
    const changesets = getFilteredChangesets();

    const branchName = `shipit-import-github-${packageName}-pr-${pullRequestNumber}`;
    monorepo.checkoutBranch(branchName);

    changesets.forEach((changeset) => {
      if (changeset.isValid()) {
        monorepo.commitPatch(changeset);
      }
    });
  };
}
