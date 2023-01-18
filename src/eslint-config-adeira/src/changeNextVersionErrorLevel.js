// @flow strict-local

/*::

import type { EslintConfigRules } from './EslintConfig.flow';

*/

module.exports = function changeNextVersionErrorLevel(
  config /*: EslintConfigRules */,
  level /*: 0|1|2 */,
) /*: EslintConfigRules */ {
  return Object.entries(config).reduce((acc /*: $FlowFixMe */, [ruleName, value]) => {
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
