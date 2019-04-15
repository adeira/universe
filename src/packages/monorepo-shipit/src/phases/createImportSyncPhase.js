// @flow strict-local

import { ChildProcess } from '@kiwicom/monorepo';

import RepoGIT, { type SourceRepo, type DestinationRepo } from '../RepoGIT';
import Changeset from '../Changeset';
import PhaseRunnerConfig from '../PhaseRunnerConfig';

export default function createImportSyncPhase(config: PhaseRunnerConfig) {
  // TODO: make it Git independent

  function getFilteredChangesets(): Set<Changeset> {
    ChildProcess.executeSystemCommand(
      'git',
      ['fetch', 'origin', 'refs/pull/1/head'], // TODO
      {
        stdio: 'inherit',
        cwd: config.exportedRepoPath,
      },
    );

    // 'git rev-parse FETCH_HEAD' to get actual hash
    const mergeBase = ChildProcess.executeSystemCommand(
      'git',
      ['merge-base', 'FETCH_HEAD', 'master'],
      {
        // stdio: 'inherit',
        cwd: config.exportedRepoPath,
      },
    );

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
    changesets.forEach(changeset => {
      if (changeset.isValid()) {
        // eslint-disable-next-line no-console
        console.warn(monorepo.renderPatch(changeset));
        // TODO: commit it to different branch
        // repo.commitPatch(changeset);
      }
    });
  };
}
