// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'js.js'), [
  ['src/js/src/__tests__/invariant.test.js', 'src/__tests__/invariant.test.js'],
  ['src/js/src/invariant.js', 'src/invariant.js'],
  ['src/js/src/index.js', 'src/index.js'],
  ['src/js/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['src/js/BUILD.bazel', undefined], // correctly deleted
  ['src/js/BUILD', undefined], // correctly deleted
  ['src/js/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/js/WORKSPACE', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
