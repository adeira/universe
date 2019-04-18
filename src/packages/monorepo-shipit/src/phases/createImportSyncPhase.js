// @flow strict-local

import { ShellCommand } from '@kiwicom/monorepo';

import RepoGIT, { type SourceRepo, type DestinationRepo } from '../RepoGIT';
import Changeset from '../Changeset';
import PhaseRunnerConfig from '../PhaseRunnerConfig';

export default function createImportSyncPhase(
  config: PhaseRunnerConfig,
  pullRequestNumber: string,
) {
  // TODO: make it Git independent

  function getFilteredChangesets(): Set<Changeset> {
    new ShellCommand(
      config.exportedRepoPath,
      'git',
      'fetch',
      'origin',
      `refs/pull/${pullRequestNumber}/head`,
    )
      .setOutputToScreen()
      .runSynchronously();

    // 'git rev-parse FETCH_HEAD' to get actual hash
    const mergeBase = new ShellCommand(
      config.exportedRepoPath,
      'git',
      'merge-base',
      'FETCH_HEAD',
      'master',
    )
      .runSynchronously()
      .getStdout();

    const changesets = new Set<Changeset>();
    const exportedRepo: SourceRepo = new RepoGIT(config.exportedRepoPath);
    exportedRepo
      .findDescendantsPath(mergeBase.trim(), 'FETCH_HEAD', new Set([]))
      .forEach(revision => {
        const changeset = exportedRepo.getChangesetFromID(revision);
        const filter = config.getDefaultImportitFilter();
        changesets.add(filter(changeset));
      });
    return changesets;
  }

  return function() {
    const monorepo: DestinationRepo = new RepoGIT(config.monorepoPath);
    const changesets = getFilteredChangesets();

    const branchName = `monorepo-importit-github-pr-${pullRequestNumber}`;
    monorepo.checkoutBranch(branchName);

    changesets.forEach(changeset => {
      if (changeset.isValid()) {
        monorepo.commitPatch(changeset);
      }
    });
  };
}
