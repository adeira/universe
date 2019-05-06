// @flow strict

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'relay.js'), [
  ['src/packages/relay/package.json', 'package.json'],
  ['src/packages/relay/src/index.js', 'src/index.js'],

  // invalid cases:
  ['src/packages/xyz/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
