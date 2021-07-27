// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'relay.js'), [
  ['src/relay/src/__flowtests__/QueryRenderer.js', 'src/__flowtests__/QueryRenderer.js'],
  ['src/relay/src/__tests__/QueryRenderer.test.js', 'src/__tests__/QueryRenderer.test.js'],
  ['src/relay/src/index.js', 'src/index.js'],
  ['src/relay/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
