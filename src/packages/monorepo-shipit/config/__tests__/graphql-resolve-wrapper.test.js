// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'graphql-resolve-wrapper.js'), [
  ['src/packages/graphql-resolve-wrapper/package.json', 'package.json'],
  ['src/packages/graphql-resolve-wrapper/src/index.js', 'src/index.js'],

  // invalid cases:
  ['src/packages/xyz/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
