// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'adeira-dev.js'), [
  ['src/adeira.dev/package.json', 'package.json'],
  ['src/adeira.dev/README.md', 'README.md'],
  ['src/adeira.dev/core/Footer.js', 'core/Footer.js'],
  ['src/adeira.dev/docs/general/introduction.md', 'docs/general/introduction.md'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['src/adeira.dev/BUILD.bazel', undefined], // correctly deleted
  ['src/adeira.dev/BUILD', undefined], // correctly deleted
  ['src/adeira.dev/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/adeira.dev/WORKSPACE', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
