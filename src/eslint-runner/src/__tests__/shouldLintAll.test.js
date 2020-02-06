// @flow strict

import shouldLintAll from '../shouldLintAll';

test.each([
  '.eslintrc',
  '.eslintrc.js',
  '.eslintrc.yml',
  '.eslintrc.yaml',
  '.eslintrc.json',
  'src/packages/relay/.eslintrc.js',
  '/Users/TEST/universe/src/packages/relay/.eslintrc.js',
  'package.json',
  'src/packages/relay/package.json',
  '/Users/code/universe/src/packages/relay/package.json',
  '.eslintignore',
])('filename "%s" IS eslint config file', filename => {
  expect(shouldLintAll(filename)).toBe(true);
});

test.each([
  'eslintrc.yaml',
  '.eslintrc.ts',
  '.eslintrc.jsonp',
  '.eslintrc/xyz',
  'src/.eslintrc/test',
  'src/test/.eslintignore',
])('filename "%s" IS NOT eslint config file', filename => {
  expect(shouldLintAll(filename)).toBe(false);
});
