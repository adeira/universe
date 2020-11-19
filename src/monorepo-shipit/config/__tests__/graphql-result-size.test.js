// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'graphql-result-size.js'), [
  ['src/graphql-result-size/src/__tests__/testschema.graphql', 'src/__tests__/testschema.graphql'],
  ['src/graphql-result-size/src/index.js', 'src/index.js'],
  ['src/graphql-result-size/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['src/js/BUILD.bazel', undefined], // correctly deleted
  ['src/js/BUILD', undefined], // correctly deleted
  ['src/js/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/js/WORKSPACE', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
