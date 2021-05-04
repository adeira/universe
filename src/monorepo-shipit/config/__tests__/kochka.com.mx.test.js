// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'kochka.com.mx.js'), [
  ['src/kochka.com.mx/pages/_app.js', 'pages/_app.js'],
  ['src/kochka.com.mx/src/Layout.js', 'src/Layout.js'],
  ['src/kochka.com.mx/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['src/kochka.com.mx/BUILD.bazel', undefined], // correctly deleted
  ['src/kochka.com.mx/BUILD', undefined], // correctly deleted
  ['src/kochka.com.mx/WORKSPACE.bazel', undefined], // correctly deleted
  ['src/kochka.com.mx/WORKSPACE', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
