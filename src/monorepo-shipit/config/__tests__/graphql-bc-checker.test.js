// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'graphql-bc-checker.js'), [
  ['src/graphql-bc-checker/src/index.js', 'src/index.js'],
  ['src/graphql-bc-checker/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['src/graphql-bc-checker/BUILD.bazel', undefined], // correctly deleted
  ['src/graphql-bc-checker/BUILD', undefined], // correctly deleted
  ['src/graphql-bc-checker/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/graphql-bc-checker/WORKSPACE', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
