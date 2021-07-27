// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'monorepo-utils.js'), [
  ['src/monorepo-utils/src/__tests__/glob.test.js', 'src/__tests__/glob.test.js'],
  ['src/monorepo-utils/src/index.js', 'src/index.js'],
  ['src/monorepo-utils/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
