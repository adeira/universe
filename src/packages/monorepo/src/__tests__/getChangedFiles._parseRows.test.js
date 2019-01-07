// @flow

import { _parseRows } from '../getChangedFiles';

it('parses rows correctly', () => {
  expect(
    _parseRows(`
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
  expect(_parseRows('')).toEqual([]);
});
