// @flow strict

import isEslintConfigFile from '../isEslintConfigFile';

test.each([
  '.eslintrc',
  '.eslintrc.js',
  '.eslintrc.yml',
  '.eslintrc.yaml',
  '.eslintrc.json',
  'src/packages/relay/.eslintrc.js',
  '/Users/TEST/universe/src/packages/relay/.eslintrc.js',
])('filename "%s" IS eslint config file', filename => {
  expect(isEslintConfigFile(filename)).toBe(true);
});

test.each([
  'eslintrc.yaml',
  '.eslintrc.ts',
  '.eslintrc.jsonp',
  '.eslintrc/xyz',
  'src/.eslintrc/test',
])('filename "%s" IS NOT eslint config file', filename => {
  expect(isEslintConfigFile(filename)).toBe(false);
});
