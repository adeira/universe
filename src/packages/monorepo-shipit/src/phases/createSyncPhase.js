// @flow strict-local

import Git from '../Git';
import Changeset from '../Changeset';
import PathFilters from '../PathFilters';

export default function createSyncPhase(
  repoPath: string,
  sourceRoots: Set<string>,
  destinationRoots: Set<string>,
  directoryMapping: Map<string, string>,
) {
  const repo = new Git(repoPath);

  function getSourceChangesets(): Set<Changeset> {
    const initialRevision = repo.findLastSourceCommit(destinationRoots);
    const sourceChangesets = new Set<Changeset>();
    repo.findDescendantsPath(initialRevision, sourceRoots).forEach(revision => {
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
            sourceRoots,
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
