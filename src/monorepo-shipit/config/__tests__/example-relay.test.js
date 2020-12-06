// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'example-relay.js'), [
  ['src/example-relay/package.json', 'package.json'],
  ['src/example-relay/src/pages/index.js', 'src/pages/index.js'],
  ['src/example-relay/__github__/.flowconfig', '.flowconfig'],
  ['src/example-relay/__github__/babel.config.js', 'babel.config.js'],
  ['src/example-relay/__github__/flow-typed/globals.js', 'flow-typed/globals.js'],
  [
    'src/example-relay/__github__/.github/workflows/continuous-integration.yml',
    '.github/workflows/continuous-integration.yml',
  ],
  ['src/example-relay/scripts/test-bc.js', 'scripts/test-bc.js'],
  ['src/example-relay/scripts/jest/setupTests.js', 'scripts/jest/setupTests.js'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['src/example-relay/.babelrc.js', undefined], // correctly deleted
  ['src/example-relay/__github__/unknown.js', undefined], // correctly deleted
  ['src/example-relay/BUILD.bazel', undefined], // correctly deleted
  ['src/example-relay/BUILD', undefined], // correctly deleted
  ['src/example-relay/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/example-relay/WORKSPACE', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
  ['src/example-relay/scripts/getTranspileWorkspaces.js', undefined], // correctly deleted
]);
