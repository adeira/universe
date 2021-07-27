// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'monorepo-shipit.js'), [
  ['src/monorepo-shipit/package.json', 'package.json'],
  ['src/monorepo-shipit/src/accounts.js', 'src/accounts.js'],
  ['src/monorepo-shipit/config/monorepo-shipit.js', 'config/monorepo-shipit.js'],
  ['src/monorepo-shipit/bin/shipit.js', 'bin/shipit.js'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
