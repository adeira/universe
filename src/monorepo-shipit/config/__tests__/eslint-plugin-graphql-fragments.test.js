// @flow strict-local

import path from 'path';

import testExportedPaths from './testExportedPaths';

testExportedPaths(path.join(__dirname, '..', 'eslint-plugin-graphql-fragments.js'), [
  [
    'src/packages/eslint-plugin-graphql-fragments/__fixtures__/AccordionFragment.graphql',
    '__fixtures__/AccordionFragment.graphql',
  ],
  [
    'src/packages/eslint-plugin-graphql-fragments/__tests__/utils.test.js',
    '__tests__/utils.test.js',
  ],
  [
    'src/packages/eslint-plugin-graphql-fragments/src/limit-complexity.js',
    'src/limit-complexity.js',
  ],
  ['src/packages/eslint-plugin-graphql-fragments/index.js', 'index.js'],
  ['src/packages/eslint-plugin-graphql-fragments/package.json', 'package.json'],

  // invalid cases:
  ['src/packages/xyz/outsideScope.js', undefined], // correctly deleted
  ['package.json', undefined], // correctly deleted
]);
