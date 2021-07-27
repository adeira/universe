// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'abacus-kochka.js'), [
  ['src/abacus-kochka/pages/_app.js', 'pages/_app.js'],
  ['src/abacus-kochka/src/Layout.js', 'src/Layout.js'],
  ['src/abacus-kochka/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
