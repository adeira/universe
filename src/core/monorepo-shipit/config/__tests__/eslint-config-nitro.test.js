// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'eslint-config-nitro.js'), [
  ['src/packages/eslint-config-nitro/.gitignore', '.gitignore'],
  ['src/packages/eslint-config-nitro/.npmrc', '.npmrc'],
  ['src/packages/eslint-config-nitro/index.js', 'index.js'],
  ['src/packages/eslint-config-nitro/package.json', 'package.json'],
  ['src/packages/eslint-config-nitro/README.md', 'README.md'],

  // invalid cases:
  ['src/packages/xyz/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
