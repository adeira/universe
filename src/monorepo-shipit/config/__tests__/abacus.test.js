// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'abacus.js'), [
  ['src/abacus/Cargo.lock', 'Cargo.lock'],
  ['src/abacus/server/Cargo.toml', 'server/Cargo.toml'],
  ['src/abacus/kubernetes/abacus.yml', 'kubernetes/abacus.yml'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
