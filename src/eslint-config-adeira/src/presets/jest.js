// @flow

const { ERROR, OFF, NEXT_VERSION_ERROR } = require('../constants');

/*::

import type { EslintConfig } from '../EslintConfig.flow';

*/

module.exports = ({
  plugins: ['eslint-plugin-jest'],
  rules: {
    // Jest (https://github.com/jest-community/eslint-plugin-jest)
    'jest/consistent-test-it': OFF,
    'jest/expect-expect': OFF,
    'jest/max-expects': OFF,
    'jest/max-nested-describe': [ERROR, { max: 5 }],
    'jest/no-alias-methods': ERROR,
    'jest/no-commented-out-tests': OFF,
    'jest/no-conditional-expect': OFF,
    'jest/no-conditional-in-test': OFF,
    'jest/no-deprecated-functions': ERROR,
    'jest/no-disabled-tests': ERROR,
    'jest/no-done-callback': OFF,
    'jest/no-duplicate-hooks': ERROR,
    'jest/no-export': ERROR,
    'jest/no-focused-tests': ERROR,
    'jest/no-hooks': OFF, // TODO: WARN (?)
    'jest/no-identical-title': ERROR,
    'jest/no-interpolation-in-snapshots': ERROR,
    'jest/no-jasmine-globals': ERROR,
    'jest/no-large-snapshots': OFF,
    'jest/no-mocks-import': ERROR,
    'jest/no-restricted-matchers': OFF,
    'jest/no-standalone-expect': ERROR,
    'jest/no-test-callback': OFF,
    'jest/no-test-prefixes': OFF,
    'jest/no-test-return-statement': ERROR,
    'jest/prefer-called-with': ERROR,
    'jest/prefer-comparison-matcher': ERROR,
    'jest/prefer-each': NEXT_VERSION_ERROR,
    'jest/prefer-equality-matcher': ERROR,
    'jest/prefer-expect-assertions': OFF,
    'jest/prefer-expect-resolves': ERROR,
    'jest/prefer-hooks-in-order': ERROR,
    'jest/prefer-hooks-on-top': ERROR,
    'jest/prefer-lowercase-title': OFF,
    'jest/prefer-mock-promise-shorthand': OFF,
    'jest/prefer-snapshot-hint': OFF, // TODO: WARN (or NEXT_VERSION_ERROR)
    'jest/prefer-spy-on': OFF,
    'jest/prefer-strict-equal': OFF, // TODO: WARN
    'jest/prefer-to-be': ERROR,
    'jest/prefer-to-contain': ERROR,
    'jest/prefer-to-have-length': ERROR,
    'jest/prefer-todo': ERROR,
    'jest/require-hook': OFF,
    'jest/require-to-throw-message': OFF,
    'jest/require-top-level-describe': OFF,
    'jest/unbound-method': OFF,
    'jest/valid-describe-callback': ERROR,
    'jest/valid-expect': ERROR,
    'jest/valid-expect-in-promise': ERROR,
    'jest/valid-title': ERROR,
  },
} /*: EslintConfig */);
