// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'sx-jest-snapshot-serializer.js'), [
  ['src/sx-jest-snapshot-serializer/__tests__/serializer.test.js', '__tests__/serializer.test.js'],
  ['src/sx-jest-snapshot-serializer/index.js', 'index.js'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['src/sx-jest-snapshot-serializer/BUILD.bazel', undefined], // correctly deleted
  ['src/sx-jest-snapshot-serializer/BUILD', undefined], // correctly deleted
  ['src/sx-jest-snapshot-serializer/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/sx-jest-snapshot-serializer/WORKSPACE', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
