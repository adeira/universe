// @flow strict

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'graphql-bc-checker.js'), [
  ['src/packages/graphql-bc-checker/package.json', 'package.json'],
  ['src/packages/graphql-bc-checker/src/index.js', 'src/index.js'],

  // invalid cases:
  ['src/packages/xyz/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
