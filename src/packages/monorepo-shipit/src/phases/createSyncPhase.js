// @flow strict-local

import RepoGIT, { type SourceRepo, type DestinationRepo } from '../RepoGIT';
import Changeset from '../Changeset';
import PhaseRunnerConfig from '../PhaseRunnerConfig';

export default function createSyncPhase(config: PhaseRunnerConfig) {
  function _getSourceRepo(): SourceRepo {
    return new RepoGIT(config.monorepoPath);
  }

  function _getDestinationRepo(): DestinationRepo {
    return new RepoGIT(config.exportedRepoPath);
  }

  function getSourceChangesets(): Set<Changeset> {
    const destinationRepo = _getDestinationRepo();
    const sourceRepo = _getSourceRepo();
    const initialRevision = destinationRepo.findLastSourceCommit(
      config.getExportedRepoRoots(),
    );
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
      // eslint-disable-next-line no-console
      console.warn(
        `Skipping since there are no changes to filter from ${initialRevision}.`,
      );
    }
    return sourceChangesets;
  }

  function getFilteredChangesets(): Set<Changeset> {
    const filteredChangesets = new Set<Changeset>();
    getSourceChangesets().forEach(changeset => {
      const changesetWithTrackingID = addTrackingData(changeset);
      const filter = config.getDefaultShipitFilter();
      filteredChangesets.add(filter(changesetWithTrackingID));
    });
    return filteredChangesets;
  }

  function addTrackingData(changeset: Changeset): Changeset {
    const revision = changeset.getID();
    const newDescription = `${changeset.getDescription()}\n\nkiwicom-source-id: ${revision}`;
    return changeset.withDescription(newDescription.trim());
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
