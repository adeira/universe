// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'css-colors.js'), [
  ['src/css-colors/src/__tests__/isColor.test.js', 'src/__tests__/isColor.test.js'],
  ['src/css-colors/src/index.js', 'src/index.js'],
  ['src/css-colors/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['src/css-colors/BUILD.bazel', undefined], // correctly deleted
  ['src/css-colors/BUILD', undefined], // correctly deleted
  ['src/css-colors/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/css-colors/WORKSPACE', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
