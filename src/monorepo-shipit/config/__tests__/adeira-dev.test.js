// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'adeira-dev.js'), [
  ['src/adeira.dev/package.json', 'package.json'],
  ['src/adeira.dev/README.md', 'README.md'],
  ['src/adeira.dev/docs/general/introduction.md', 'docs/general/introduction.md'],
  ['src/adeira.dev/__github__/babel.config.js', 'babel.config.js'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
  ['src/adeira.dev/.babelrc.js', undefined], // correctly deleted
]);
