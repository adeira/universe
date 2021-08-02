// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'icons.js'), [
  ['src/icons/__generated__/__meta.js', '__generated__/__meta.js'],
  ['src/icons/__generated__/Backward.js', '__generated__/Backward.js'],
  ['src/icons/original/backward.svg', 'original/backward.svg'],
  ['src/icons/svg2jsx/index.js', 'svg2jsx/index.js'],
  ['src/icons/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
