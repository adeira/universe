// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'sx-design.js'), [
  ['src/sx-design/src/SkipLink.js', 'src/SkipLink.js'],
  ['src/sx-design/index.js', 'index.js'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['src/sx-design/BUILD.bazel', undefined], // correctly deleted
  ['src/sx-design/BUILD', undefined], // correctly deleted
  ['src/sx-design/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/sx-design/WORKSPACE', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
