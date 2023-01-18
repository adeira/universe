// @flow

import ourRules from '../index';
import ourBaseRules from '../src/presets/base';
import deprecatedRules from '../src/deprecatedRules';
import extraPrettierRules from '../src/extraPrettierRules';
import type { EslintConfigRules } from '../src/EslintConfig.flow';

test('our rules should not contain deprecated Eslint rules', () => {
  const allRules = ourRules.rules;
  const deprecated = new Set<string>();

  expect(allRules['no-debugger']).toBe(2); // just to make sure this test works

  Object.keys(allRules).forEach((rule) => {
    if (deprecatedRules.has(rule)) {
      deprecated.add(rule);
    }
  });

  expect(deprecated).toEqual(new Set());
});

function compareRulesets(testedSet: EslintConfigRules, bannedSet: EslintConfigRules): Set<string> {
  const extraPrettier = new Set<string>();

  // These rules can stay as long as they use very specific configuration:
  const whitelistedConfigs = {
    curly: 'all', // https://github.com/prettier/eslint-config-prettier#curly
  };

  for (const [ruleName, config] of Object.entries(testedSet)) {
    if (ruleName in bannedSet) {
      extraPrettier.add(ruleName);
      if (
        ruleName in whitelistedConfigs &&
        Array.isArray(config) &&
        whitelistedConfigs[ruleName] === config[1]
      ) {
        extraPrettier.delete(ruleName);
      }
    }
  }

  return extraPrettier;
}

test('compareRulesets behavior', () => {
  expect(compareRulesets({ aaa: 2 }, { bbb: 2 })).toEqual(new Set());
  expect(compareRulesets({ aaa: 2 }, { aaa: 2 })).toEqual(new Set(['aaa']));
  expect(compareRulesets({ aaa: 2 }, { aaa: 0 })).toEqual(new Set(['aaa']));

  expect(compareRulesets({ curly: 2 }, { curly: 2 })).toEqual(new Set(['curly']));

  // this is fine, this rule has an exception:
  expect(compareRulesets({ curly: [2, 'all'] }, { curly: 2 })).toEqual(new Set());
});

test('our base rules should not contain specific Prettier rules', () => {
  expect(compareRulesets(ourBaseRules.rules, extraPrettierRules)).toEqual(new Set());
});
