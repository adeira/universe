// @flow

import { __parseRows } from '../Git';

it('parses rows correctly', () => {
  expect(
    __parseRows(`
src/packages/eslint-config-kiwicom/index.js
src/packages/eslint-config-kiwicom/ourRules.js
src/packages/eslint-config-kiwicom/package.json
`),
  ).toEqual([
    'src/packages/eslint-config-kiwicom/index.js',
    'src/packages/eslint-config-kiwicom/ourRules.js',
    'src/packages/eslint-config-kiwicom/package.json',
  ]);
});

it('handles empty rows correctly', () => {
  expect(__parseRows('')).toEqual([]);
});
