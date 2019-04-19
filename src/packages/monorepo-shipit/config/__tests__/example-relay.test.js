// @flow

import config from '../example-relay';
import PathFilters from '../../src/PathFilters';
import Changeset from '../../src/Changeset';

test.each([
  ['src/apps/relay-example/package.json', 'package.json'],
  ['src/apps/relay-example/src/index.js', 'src/index.js'],
  // ['src/apps/relay-example/__github__/.flowconfig', '.flowconfig'],
  ['src/apps/relay-example/__github__/unknown.js', '__github__/unknown.js'], // probably unwanted
])('mapping: %s -> %s', (input, output) => {
  const inputChangeset = new Changeset().withDiffs(
    new Set([{ path: input, body: 'mocked' }]),
  );
  const outputDataset = PathFilters.moveDirectories(
    inputChangeset,
    config.getDefaultPathMappings(),
  );
  expect(...outputDataset.getDiffs()).toEqual({
    body: 'mocked',
    path: output,
  });
});
