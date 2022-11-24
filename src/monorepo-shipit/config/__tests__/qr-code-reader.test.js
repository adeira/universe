// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'qr-code-reader.js'), [
  ['src/qr-code-reader/src/QrCodeReader.js', 'src/QrCodeReader.js'],
  ['src/qr-code-reader/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
