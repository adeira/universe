// @flow

const { ERROR, NEXT_VERSION_ERROR, OFF } = require('../constants');

/*::

import type { EslintConfig } from '../EslintConfig.flow';

*/

module.exports = ({
  plugins: ['eslint-plugin-jest'],
  rules: {
    // Jest (https://github.com/jest-community/eslint-plugin-jest)
    'jest/consistent-test-it': OFF,
    'jest/expect-expect': OFF,
    'jest/lowercase-name': OFF,
    'jest/max-nested-describe': [NEXT_VERSION_ERROR, { max: 5 }],
    'jest/no-alias-methods': OFF,
    'jest/no-commented-out-tests': OFF,
    'jest/no-conditional-expect': OFF,
    'jest/no-deprecated-functions': ERROR,
    'jest/no-disabled-tests': ERROR,
    'jest/no-done-callback': OFF,
    'jest/no-duplicate-hooks': ERROR,
    'jest/no-expect-resolves': OFF,
    'jest/no-export': ERROR,
    'jest/no-focused-tests': ERROR,
    'jest/no-hooks': OFF, // TODO: WARN (?)
    'jest/no-identical-title': ERROR,
    'jest/no-if': OFF,
    'jest/no-interpolation-in-snapshots': ERROR,
    'jest/no-jasmine-globals': ERROR,
    'jest/no-jest-import': ERROR,
    'jest/no-large-snapshots': OFF,
    'jest/no-mocks-import': ERROR,
    'jest/no-restricted-matchers': OFF,
    'jest/no-standalone-expect': ERROR,
    'jest/no-test-callback': OFF,
    'jest/no-test-prefixes': OFF,
    'jest/no-test-return-statement': ERROR,
    'jest/no-truthy-falsy': OFF,
    'jest/prefer-called-with': ERROR,
    'jest/prefer-expect-assertions': OFF,
    'jest/prefer-hooks-on-top': ERROR,
    'jest/prefer-inline-snapshots': OFF,
    'jest/prefer-spy-on': OFF,
    'jest/prefer-strict-equal': OFF, // TODO: WARN
    'jest/prefer-to-be-null': ERROR,
    'jest/prefer-to-be-undefined': ERROR,
    'jest/prefer-to-contain': ERROR,
    'jest/prefer-to-have-length': ERROR,
    'jest/prefer-todo': ERROR,
    'jest/require-to-throw-message': OFF,
    'jest/require-top-level-describe': OFF,
    'jest/unbound-method': OFF,
    'jest/valid-describe': ERROR,
    'jest/valid-expect': ERROR,
    'jest/valid-expect-in-promise': ERROR,
    'jest/valid-title': ERROR,
    'jest/prefer-expect-resolves': NEXT_VERSION_ERROR,
    'jest/prefer-to-be': NEXT_VERSION_ERROR,
  },
} /*: EslintConfig */);
