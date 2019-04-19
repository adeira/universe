// @flow

/*::

type EslintConfigErrorLevel = 0 | 1 | 2 | 'off' | 'warn' | 'error' | 3; // "3" is our speciality
type EslintConfig = {
  [string]:
    | EslintConfigErrorLevel
    | [EslintConfigErrorLevel, any]
    | [EslintConfigErrorLevel, any, any],
};

*/

module.exports = function changeNextVersionErrorLevel(
  config /*: EslintConfig */,
  level /*: 0|1|2 */,
) {
  return Object.entries(config).reduce((acc, [ruleName, value]) => {
    let newValue = -1;

    if (value === 3) {
      newValue = level;
    } else if (Array.isArray(value)) {
      newValue = value;
      newValue[0] = level;
    } else {
      newValue = value;
    }

    acc[ruleName] = newValue;
    return acc;
  }, {});
};
