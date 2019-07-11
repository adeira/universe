// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'eslint-plugin-kiwicom-incubator.js'), [
  ['src/packages/eslint-plugin-kiwicom-incubator/package.json', 'package.json'],
  ['src/packages/eslint-plugin-kiwicom-incubator/src/index.js', 'src/index.js'],

  // invalid cases:
  ['src/packages/xyz/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
