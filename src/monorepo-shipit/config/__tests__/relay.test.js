// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'relay.js'), [
  ['src/packages/relay/package.json', 'package.json'],
  ['src/packages/relay/src/index.js', 'src/index.js'],
  ['src/packages/relay/.eslintrc.js', undefined],
  ['src/packages/relay/__github__/.eslintignore', '.eslintignore'],
  ['src/packages/relay/__github__/.eslintrc.js', '.eslintrc.js'],
  ['src/packages/relay/__github__/.flowconfig', '.flowconfig'],
  ['src/packages/relay/__github__/babel.config.js', 'babel.config.js'],
  ['src/packages/relay/__github__/flow-typed/globals.js', 'flow-typed/globals.js'],
  [
    'src/packages/relay/__github__/flow-typed/npm/jest_v24.x.x.js',
    'flow-typed/npm/jest_v24.x.x.js',
  ],
  ['src/packages/relay/__github__/jest.config.js', 'jest.config.js'],

  // invalid cases:
  ['src/packages/xyz/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
