// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'mrtnzlml-meta.js'), [
  ['src/mrtnzlml-meta/docs/flow.md', 'docs/flow.md'],
  ['src/mrtnzlml-meta/src/pages/index.js', 'src/pages/index.js'],
  ['src/mrtnzlml-meta/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
