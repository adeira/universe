// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'eslint-config-adeira.js'), [
  ['src/eslint-config-adeira/package.json', 'package.json'],
  ['src/eslint-config-adeira/ourRules.js', 'ourRules.js'],
  ['src/eslint-config-adeira/__tests__/ourRules.test.js', '__tests__/ourRules.test.js'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
