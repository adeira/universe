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

  // These rules can stay as long as they use very specific configuration:
  const whitelistedConfigs = {
    curly: 'all', // https://github.com/prettier/eslint-config-prettier#curly
  };

  for (const [rule, config] of (Object.entries(ourRules): $ReadOnlyArray<
    [string, Object],
  >)) {
    if (extraPrettierRules[rule] !== undefined) {
      const whitelistedRule = whitelistedConfigs[rule];
      if (whitelistedRule !== undefined && whitelistedRule !== config[1]) {
        extraPrettier.add(rule);
      }
    }
  }

  expect(extraPrettier).toEqual(new Set<void>());
});
