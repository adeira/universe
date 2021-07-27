// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'eslint-plugin-sx.js'), [
  ['src/eslint-plugin-sx/src/rules/valid-usage.js', 'src/rules/valid-usage.js'],
  ['src/eslint-plugin-sx/src/index.js', 'src/index.js'],
  ['src/eslint-plugin-sx/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
