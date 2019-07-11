// @flow strict-local

import logger from '@kiwicom/logger';

import RepoGIT, { type SourceRepo, type DestinationRepo } from '../RepoGIT';
import Changeset from '../Changeset';
import ShipitConfig from '../ShipitConfig';

export default function createSyncPhase(config: ShipitConfig) {
  function _getSourceRepo(): SourceRepo {
    return new RepoGIT(config.sourcePath);
  }

  function _getDestinationRepo(): DestinationRepo {
    return new RepoGIT(config.destinationPath);
  }

  function getSourceChangesets(): Set<Changeset> {
    const destinationRepo = _getDestinationRepo();
    const sourceRepo = _getSourceRepo();
    const initialRevision = destinationRepo.findLastSourceCommit(config.getExportedRepoRoots());
    const sourceChangesets = new Set<Changeset>();
    const descendantsPath = sourceRepo.findDescendantsPath(
      initialRevision,
      'origin/master', // GitLab CI doesn't have master branch
      config.getMonorepoRoots(),
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
    changesets.forEach(changeset => {
      if (changeset.isValid()) {
        destinationRepo.commitPatch(changeset);
      }
    });
  };
}
