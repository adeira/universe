// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'eslint-fixtures-tester.js'), [
  ['src/eslint-fixtures-tester/src/index.js', 'src/index.js'],
  ['src/eslint-fixtures-tester/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
