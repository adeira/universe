// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'abacus-backoffice.js'), [
  ['src/abacus-backoffice/pages/_app.js', 'pages/_app.js'],
  ['src/abacus-backoffice/src/LayoutPage.js', 'src/LayoutPage.js'],
  ['src/abacus-backoffice/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
