// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'eslint-config-kiwicom.js'), [
  ['src/packages/eslint-config-kiwicom/package.json', 'package.json'],
  ['src/packages/eslint-config-kiwicom/src/index.js', 'src/index.js'],

  // invalid cases:
  ['src/packages/xyz/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
