// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'homebrew-universe.js'), [
  ['src/homebrew-universe/.github/workflows/publish.yml', '.github/workflows/publish.yml'],
  ['src/homebrew-universe/.github/workflows/test.yml', '.github/workflows/test.yml'],
  ['src/homebrew-universe/README.md', 'README.md'],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
