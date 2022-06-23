// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'signed-source-rs.js'), [
  ['src/abacus/signedsource/src/lib.rs', 'src/lib.rs'],
  ['src/abacus/signedsource/Cargo.toml', 'Cargo.toml'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
