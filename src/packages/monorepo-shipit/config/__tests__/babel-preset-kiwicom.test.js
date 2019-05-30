// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'babel-preset-kiwicom.js'), [
  ['src/packages/babel-preset-kiwicom/package.json', 'package.json'],
  ['src/packages/babel-preset-kiwicom/src/index.js', 'src/index.js'],

  // invalid cases:
  ['src/packages/xyz/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
