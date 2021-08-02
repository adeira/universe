// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'monorepo-npm-publisher.js'), [
  ['src/monorepo-npm-publisher/package.json', 'package.json'],
  ['src/monorepo-npm-publisher/src/index.js', 'src/index.js'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
