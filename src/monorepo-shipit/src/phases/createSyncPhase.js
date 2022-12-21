// @flow strict-local

import RepoGit, { type DestinationRepo, type SourceRepo } from '../RepoGit';
import Changeset from '../Changeset';
import ShipitConfig from '../ShipitConfig';

export default function createSyncPhase(config: ShipitConfig): () => void {
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
      descendantsPath.forEach((revision) => {
        sourceChangesets.add(sourceRepo.getChangesetFromID(revision));
      });
    }
    return sourceChangesets;
  }

  function getFilteredChangesets(): Set<Changeset> {
    const filteredChangesets = new Set<Changeset>();
    getSourceChangesets().forEach((changeset) => {
      const filter = config.getDefaultShipitFilter();
      filteredChangesets.add(filter(changeset));
    });
    return filteredChangesets;
  }

  const phase = function () {
    const destinationRepo = _getDestinationRepo();
    const changesets = getFilteredChangesets();

    destinationRepo.checkoutBranch(config.getDestinationBranch());

    changesets.forEach((changeset) => {
      changeset.dumpDebugMessages();
      if (changeset.isValid()) {
        destinationRepo.commitPatch(changeset);
      }
    });
  };

  phase.readableName = 'Synchronize repository';
  return phase;
}
