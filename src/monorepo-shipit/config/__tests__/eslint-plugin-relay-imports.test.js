// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'eslint-plugin-relay-imports.js'), [
  ['src/packages/eslint-plugin-relay-imports/__tests__/index.test.js', '__tests__/index.test.js'],
  ['src/packages/eslint-plugin-relay-imports/index.js', 'index.js'],
  ['src/packages/eslint-plugin-relay-imports/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/xyz/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
