// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'rossum-sheets.js'), [
  ['src/rossum-hooks/src/sheets/README.md', 'README.md'],
  ['src/rossum-hooks/src/sheets/rossumHookRequestHandler.js', 'rossumHookRequestHandler.js'],
  ['src/rossum-hooks/src/sheets/plugins/RegexPlugin.js', 'plugins/RegexPlugin.js'],
  [
    'src/rossum-hooks/src/sheets/plugins/__tests__/RegexPlugin.js',
    'plugins/__tests__/RegexPlugin.js',
  ],

  // invalid cases:
  ['src/packages/monorepo/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
