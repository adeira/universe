// @flow

const OFF = 0;
const ERROR = 2;

module.exports = {
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'prettier',
    'prettier/react',
    'plugin:flowtype/recommended',
    'plugin:jest/recommended',
  ],
  plugins: [
    'import',
    'jest',
    'kiwi-graphql',
    'prettier',
    'promise',
    'flowtype',
  ],
  rules: {
    curly: [ERROR, 'all'],
    camelcase: ERROR,
    'no-lonely-if': ERROR,
    'no-else-return': ERROR,
    'no-use-before-define': OFF,
    'no-shadow': OFF,
    'import/prefer-default-export': OFF,
    'import/no-dynamic-require': OFF,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.js'],
      },
    ],
    'import/order': [
      ERROR,
      {
        groups: [['builtin', 'external'], ['parent', 'sibling'], 'index'],
        'newlines-between': 'always',
      },
    ],
    'kiwi-graphql/only-nullable-fields': 'error',
    'prefer-const': 'error',
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        printWidth: 80,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
      },
    ],
    'promise/always-return': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    'promise/no-nesting': 'warn',
    'promise/no-promise-in-callback': 'warn',
    'promise/no-callback-in-promise': 'warn',
    'promise/avoid-new': 'off',
    'promise/prefer-await-to-then': 'error',
    'promise/prefer-await-to-callbacks': 'off',
    'flowtype/require-valid-file-annotation': ['error', 'always'],
    'flowtype/newline-after-flow-annotation': ['error', 'always'],
    'flowtype/generic-spacing': 'off',
    'eol-last': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'graphql-relay',
            importNames: ['connectionFromArray'],
            message:
              "please import { connectionFromArray } from '/src/common/services/ArrayConnection' instead",
          },
        ],
      },
    ],
  },
};
