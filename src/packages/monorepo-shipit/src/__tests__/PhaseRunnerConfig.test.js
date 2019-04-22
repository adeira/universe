// @flow strict-local

import Config from '../PhaseRunnerConfig';

jest.mock('fs');

it('throws an error when trying to access non-existent roots', () => {
  expect(() =>
    new Config(
      'fake monorepo path',
      'fake exported repo URL',
      new Map([['/unknown_path', '']]),
    ).getMonorepoRoots(),
  ).toThrowError('Directory mapping uses non-existent root: /unknown_path');
});

it('returns empty set when trying to get roots of the exported repo', () => {
  expect(
    new Config(
      'fake monorepo path',
      'fake exported repo URL',
      new Map([['/known_path', '/destination_path']]),
    ).getExportedRepoRoots(),
  ).toEqual(
    new Set(), // empty set expected
  );
});
