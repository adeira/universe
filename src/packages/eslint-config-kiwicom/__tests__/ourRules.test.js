// @flow

const ourRules = require('../ourRules');
const deprecatedRules = require('../deprecatedRules');
const extraPrettierRules = require('../extraPrettierRules');

test('our rules should not contain deprecated Eslint rules', () => {
  const deprecated = new Set();

  Object.keys(ourRules).forEach(rule => {
    if (deprecatedRules.has(rule)) {
      deprecated.add(rule);
    }
  });

  expect(deprecated).toEqual(new Set());
});

test('our rules should not contain specific Prettier rules', () => {
  const extraPrettier = new Set<string>();

  Object.keys(ourRules).forEach(rule => {
    if (extraPrettierRules[rule] !== undefined) {
      extraPrettier.add(rule);
    }
  });

  expect(extraPrettier).toEqual(new Set<void>());
});
