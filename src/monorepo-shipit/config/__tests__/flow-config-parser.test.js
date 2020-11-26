// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'flow-config-parser.js'), [
  ['src/flow-config-parser/src/__tests__/parse.test.js', 'src/__tests__/parse.test.js'],
  ['src/flow-config-parser/src/parse.js', 'src/parse.js'],
  ['src/flow-config-parser/src/index.js', 'src/index.js'],
  ['src/flow-config-parser/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['src/flow-config-parser/BUILD.bazel', undefined], // correctly deleted
  ['src/flow-config-parser/BUILD', undefined], // correctly deleted
  ['src/flow-config-parser/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/flow-config-parser/WORKSPACE', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
