// @flow strict

/*::

// Level "3" is our NEXT_VERSION_ERROR speciality:
type EslintConfigErrorLevel = 0 | 1 | 2 | 'off' | 'warn' | 'error' | 3;

type EslintRuleOption = string | { [name: string]: mixed };

type EslintConfigValues =
  | EslintConfigErrorLevel
  | [EslintConfigErrorLevel, EslintRuleOption]
  | [EslintConfigErrorLevel, EslintRuleOption, EslintRuleOption];

type EslintConfig = {
  [string]: EslintConfigValues,
};

*/

module.exports = function changeNextVersionErrorLevel(
  config /*: EslintConfig */,
  level /*: 0|1|2 */,
) /*: EslintConfig */ {
  return Object.entries(config).reduce((acc, [ruleName, value]) => {
    if (Array.isArray(value) && value[0] === 3) {
      const [, ...config] = value;
      acc[ruleName] = [level, ...config];
    } else if (value === 3) {
      acc[ruleName] = level;
    } else {
      acc[ruleName] = value;
    }
    return acc;
  }, {});
};
