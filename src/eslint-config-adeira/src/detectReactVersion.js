// @flow strict

/**
 * This is basically copy-pasted detection from the React plugin except it doesn't
 * complain when React dependency is missing. It's because we expect non-React environments.
 * See: https://github.com/yannickcr/eslint-plugin-react/blob/6bb160459383a2eeec5d65e3de07e37e997b5f1a/lib/util/version.js#L12
 */
module.exports = function detectReactVersion() /*: string */ {
  try {
    const react = require('react'); // eslint-disable-line import/no-extraneous-dependencies
    return react.version;
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return '999.999.999';
    }
    throw error;
  }
};
