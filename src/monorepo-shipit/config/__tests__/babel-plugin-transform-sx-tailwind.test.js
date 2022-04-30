// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'babel-plugin-transform-sx-tailwind.js'), [
  ['src/babel-plugin-transform-sx-tailwind/package.json', 'package.json'],
  ['src/babel-plugin-transform-sx-tailwind/src/index.js', 'src/index.js'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
