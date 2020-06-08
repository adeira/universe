// @flow strict-local

import logger from '@adeira/logger';

import RepoGit, { type SourceRepo, type DestinationRepo } from '../RepoGit';
import Changeset from '../Changeset';
import ShipitConfig from '../ShipitConfig';

export default function createSyncPhase(config: ShipitConfig) {
  function _getSourceRepo(): SourceRepo {
    return new RepoGit(config.sourcePath);
  }

  function _getDestinationRepo(): DestinationRepo {
    return new RepoGit(config.destinationPath);
  }

  function getSourceChangesets(): Set<Changeset> {
    const destinationRepo = _getDestinationRepo();
    const sourceRepo = _getSourceRepo();
    let initialRevision = destinationRepo.findLastSourceCommit(config.getDestinationRoots());
    if (initialRevision === null) {
      // Seems like it's a new repo so there is no signed commit.
      // Let's take the first one from our source repo instead.
      initialRevision = sourceRepo.findFirstAvailableCommit();
    }
    const sourceChangesets = new Set<Changeset>();
    const descendantsPath = sourceRepo.findDescendantsPath(
      initialRevision,
      config.getSourceBranch(),
      config.getSourceRoots(),
    );
    if (descendantsPath !== null) {
      descendantsPath.forEach(revision => {
        sourceChangesets.add(sourceRepo.getChangesetFromID(revision));
      });
    } else {
      logger.warn(`Skipping since there are no changes to filter from ${initialRevision}.`);
    }
    return sourceChangesets;
  }

  function getFilteredChangesets(): Set<Changeset> {
    const filteredChangesets = new Set<Changeset>();
    getSourceChangesets().forEach(changeset => {
      const filter = config.getDefaultShipitFilter();
      filteredChangesets.add(filter(changeset));
    });
    return filteredChangesets;
  }

  return function() {
    const destinationRepo = _getDestinationRepo();
    const changesets = getFilteredChangesets();

    destinationRepo.checkoutBranch(config.getDestinationBranch());

    changesets.forEach(changeset => {
      if (changeset.isValid()) {
        destinationRepo.commitPatch(changeset);
      }
    });
  };
}
