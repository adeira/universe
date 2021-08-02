// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'fetch.js'), [
  [
    'src/fetch/src/__tests__/fetchWithRetries.200.test.js',
    'src/__tests__/fetchWithRetries.200.test.js',
  ],
  ['src/fetch/src/fetch.js', 'src/fetch.js'],
  ['src/fetch/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
