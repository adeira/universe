// @flow

import config from '../example-relay';
import Changeset from '../../src/Changeset';
import PhaseRunnerConfig from '../../src/PhaseRunnerConfig';

jest.mock('fs');

test.each([
  ['src/apps/example-relay/package.json', 'package.json'],
  ['src/apps/example-relay/pages/index.js', 'pages/index.js'],
  [
    'src/apps/example-relay/src/locations/CountryFlag.js',
    'src/locations/CountryFlag.js',
  ],
  [
    'src/apps/example-relay/__generated__/AppQuery.graphql.js',
    '__generated__/AppQuery.graphql.js',
  ],
  ['src/apps/example-relay/__github__/.flowconfig', '.flowconfig'],

  // invalid cases:
  ['src/apps/example-relay/__github__/unknown.js', '__github__/unknown.js'], // probably unwanted
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
])('mapping: %s -> %s', (input, output) => {
  const defaultFilter = new PhaseRunnerConfig(
    'mocked repo path',
    'mocked repo URL',
    config.getDefaultPathMappings(),
  ).getDefaultShipitFilter();

  const inputChangeset = new Changeset().withDiffs(
    new Set([{ path: input, body: 'mocked' }]),
  );

  const outputDataset = defaultFilter(inputChangeset);

  if (output === undefined) {
    expect(...outputDataset.getDiffs()).toBeUndefined();
  } else {
    expect(...outputDataset.getDiffs()).toEqual({
      body: 'mocked',
      path: output,
    });
  }
});
