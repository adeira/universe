// @flow

import Git from '../Git';

it('parses rows correctly', () => {
  expect(
    Git._parseRows(`
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
  expect(Git._parseRows('')).toEqual([]);
});
