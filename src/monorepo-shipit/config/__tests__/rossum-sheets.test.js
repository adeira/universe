// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'rossum-sheets.js'), [
  ['src/rossum-sheets/README.md', 'README.md'],
  ['src/rossum-sheets/package.json', 'package.json'],
  ['src/rossum-sheets/src/processRossumPayload.js', 'src/processRossumPayload.js'],
  ['src/rossum-sheets/src/plugins/RegexPlugin.js', 'src/plugins/RegexPlugin.js'],
  [
    'src/rossum-sheets/src/plugins/__tests__/RegexPlugin.js',
    'src/plugins/__tests__/RegexPlugin.js',
  ],
  ['src/rossum-sheets/src/handlers/awsLambda.js', 'src/handlers/awsLambda.js'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
