// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'babel-preset-adeira.js'), [
  ['src/babel-preset-adeira/src/__tests__/configs.test.js', 'src/__tests__/configs.test.js'],
  ['src/babel-preset-adeira/src/index.js', 'src/index.js'],
  ['src/babel-preset-adeira/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['src/babel-preset-adeira/BUILD.bazel', undefined], // correctly deleted
  ['src/babel-preset-adeira/BUILD', undefined], // correctly deleted
  ['src/babel-preset-adeira/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/babel-preset-adeira/WORKSPACE', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
