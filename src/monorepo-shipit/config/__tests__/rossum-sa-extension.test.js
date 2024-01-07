// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'rossum-sa-extension.js'), [
  ['src/rossum-sa-extension/README.md', 'README.md'],
  ['src/rossum-sa-extension/package.json', 'package.json'],
  ['src/rossum-sa-extension/scripts/annotation-schema-id.js', 'scripts/annotation-schema-id.js'],
  ['src/rossum-sa-extension/popup/popup.html', 'popup/popup.html'],
  ['src/rossum-sa-extension/icons/16-blue-crunch.png', 'icons/16-blue-crunch.png'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
