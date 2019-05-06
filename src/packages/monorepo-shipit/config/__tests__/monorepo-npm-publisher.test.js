// @flow strict

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'monorepo-npm-publisher.js'), [
  ['src/packages/monorepo-npm-publisher/package.json', 'package.json'],
  ['src/packages/monorepo-npm-publisher/src/index.js', 'src/index.js'],

  // invalid cases:
  ['src/packages/xyz/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
