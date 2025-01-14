// @flow

import { findMonorepoRoot } from '@adeira/monorepo-utils';

import RepoGit from '../RepoGit';
import ShipitConfig from '../ShipitConfig';

// This is a high level integration test which does approximately the same as Shipit with small
// exceptions (for example, we do not try to apply the changeset because we would need to whole
// exported project history). It uses real commits from `adeira/universe` so you can run:
//
// ```
// git show cc7b3818e06f95c2732f75f165a2b98c6eeab135
// ```
//
// This test snapshots various states throughout the export process so you can observe how are the
// filters being applies and how are the changesets being rendered.
test.each([
  // TODO: add more commits as you go
  ['cc7b3818e06f95c2732f75f165a2b98c6eeab135', new Map([['src/eslint-config-adeira/', '']])],
])(
  'creates correct changeset from commit %s, filters it and renders it as expected',
  (commitHash, directoryMapping) => {
    const universeRoot = findMonorepoRoot();
    const universeRepo = new RepoGit(universeRoot);

    const changeset = universeRepo.getChangesetFromID(commitHash);

    // First, check that we can construct the changeset as expected:
    expect(changeset).toMatchSnapshot('1 - parsed changeset without filters');

    const shipitConfig = new ShipitConfig(
      universeRoot, // from repo URI
      'mocked.git', // to repo URI
      directoryMapping,
      new Set(), // stripped files
    );
    const defaultFilter = shipitConfig.getDefaultShipitFilter();
    const filteredChangeset = defaultFilter(changeset);

    // Then we check that the default filters were applied to the changeset as expected:
    expect(filteredChangeset).toMatchSnapshot('2 - parsed changeset WITH applied filters');

    // And finally, we verify that the filtered changeset is being rendered as expected:
    expect(universeRepo.renderPatch(filteredChangeset)).toMatchSnapshot('3 - rendered changeset');
  },
);
