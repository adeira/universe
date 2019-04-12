// @flow strict-local

import Git from '../Git';
import Changeset from '../Changeset';
import PathFilters from '../PathFilters';

export default function createSyncPhase(
  repoPath: string,
  directoryMapping: Map<string, string>,
) {
  const repo = new Git(repoPath);

  function __computeSourceRoots(
    directoryMapping: Map<string, string>,
  ): Set<string> {
    return new Set(directoryMapping.keys());
  }

  function __computeDestinationRoots(
    directoryMapping: Map<string, string>,
  ): Set<string> {
    return new Set(directoryMapping.values());
  }

  function getSourceChangesets(): Set<Changeset> {
    const initialRevision = repo.findLastSourceCommit(
      __computeDestinationRoots(directoryMapping),
    );
    const sourceChangesets = new Set<Changeset>();
    repo
      .findDescendantsPath(
        initialRevision,
        __computeSourceRoots(directoryMapping),
      )
      .forEach(revision => {
        sourceChangesets.add(repo.getChangesetFromID(revision));
      });
    return sourceChangesets;
  }

  function getFilteredChangesets(): Set<Changeset> {
    const filteredChangesets = new Set<Changeset>();
    getSourceChangesets().forEach(changeset => {
      const changesetWithTrackingID = addTrackingData(changeset);
      filteredChangesets.add(
        PathFilters.moveDirectories(
          PathFilters.stripExceptDirectories(
            changesetWithTrackingID,
            __computeSourceRoots(directoryMapping),
          ),
          directoryMapping,
        ),
      );
    });
    return filteredChangesets;
  }

  function addTrackingData(changeset: Changeset): Changeset {
    const revision = changeset.getID();
    const newDescription =
      changeset.getDescription() + '\n\nkiwicom-source-id: ' + revision;
    return changeset.withDescription(newDescription.trim());
  }

  return function() {
    const changesets = getFilteredChangesets();

    changesets.forEach(changeset => {
      if (changeset.isValid()) {
        repo.commitChangeset(changeset);
      }
    });
  };
}
