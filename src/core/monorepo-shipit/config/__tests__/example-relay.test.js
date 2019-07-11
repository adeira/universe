// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'example-relay.js'), [
  ['src/incubator/example-relay/package.json', 'package.json'],
  ['src/incubator/example-relay/pages/index.js', 'pages/index.js'],
  ['src/incubator/example-relay/src/locations/CountryFlag.js', 'src/locations/CountryFlag.js'],
  [
    'src/incubator/example-relay/__generated__/AppQuery.graphql.js',
    '__generated__/AppQuery.graphql.js',
  ],
  ['src/incubator/example-relay/__github__/.circleci/config.yml', '.circleci/config.yml'],
  ['src/incubator/example-relay/__github__/.flowconfig', '.flowconfig'],

  // invalid cases:
  ['src/incubator/example-relay/__github__/unknown.js', undefined], // correctly deleted
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
