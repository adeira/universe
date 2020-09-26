// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'docs-adeira-dev.js'), [
  ['src/docs/package.json', 'package.json'],
  ['src/docs/README.md', 'README.md'],
  ['src/docs/core/Footer.js', 'core/Footer.js'],
  ['src/docs/docs/general/introduction.md', 'docs/general/introduction.md'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['src/docs/BUILD.bazel', undefined], // correctly deleted
  ['src/docs/BUILD', undefined], // correctly deleted
  ['src/docs/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/docs/WORKSPACE', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
