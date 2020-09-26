// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'sx.js'), [
  ['src/sx/__flowtests__/sx.js', '__flowtests__/sx.js'],
  ['src/sx/src/create.js', 'src/create.js'],
  ['src/sx/index.js', 'index.js'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['src/sx/BUILD.bazel', undefined], // correctly deleted
  ['src/sx/BUILD', undefined], // correctly deleted
  ['src/sx/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/sx/WORKSPACE', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
