// @flow strict-local

/*::

import type { EslintConfigRules } from './EslintConfig.flow';

*/

module.exports = function changeNextVersionErrorLevel(
  config /*: EslintConfigRules */,
  level /*: 0|1|2 */,
) /*: EslintConfigRules */ {
  return Object.entries(config).reduce((acc, [ruleName, value]) => {
    if (Array.isArray(value) && value[0] === 3) {
      const [, ...config] = value;
      /* $FlowFixMe[prop-missing] This comment suppresses an error when
       * upgrading Flow to version 0.191.0. To see the error delete this
       * comment and run Flow. */
      acc[ruleName] = [level, ...config];
    } else if (value === 3) {
      /* $FlowFixMe[prop-missing] This comment suppresses an error when
       * upgrading Flow to version 0.191.0. To see the error delete this
       * comment and run Flow. */
      acc[ruleName] = level;
    } else {
      /* $FlowFixMe[prop-missing] This comment suppresses an error when
       * upgrading Flow to version 0.191.0. To see the error delete this
       * comment and run Flow. */
      acc[ruleName] = value;
    }
    return acc;
  }, {});
};
