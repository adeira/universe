// @flow

const OFF = 0;
const WARNING = 1;
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
    'prefer-const': ERROR,
    'eol-last': ERROR,
    'import/prefer-default-export': OFF,
    'import/no-dynamic-require': OFF,
    'import/no-extraneous-dependencies': [
      ERROR,
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
    'prettier/prettier': [
      ERROR,
      {
        bracketSpacing: true,
        printWidth: 80,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
      },
    ],
    'promise/always-return': ERROR,
    'promise/no-return-wrap': ERROR,
    'promise/param-names': ERROR,
    'promise/catch-or-return': ERROR,
    'promise/no-native': OFF,
    'promise/no-nesting': WARNING,
    'promise/no-promise-in-callback': WARNING,
    'promise/no-callback-in-promise': WARNING,
    'promise/avoid-new': OFF,
    'promise/prefer-await-to-then': ERROR,
    'promise/prefer-await-to-callbacks': OFF,
    'flowtype/require-valid-file-annotation': [ERROR, 'always'],
    'flowtype/newline-after-flow-annotation': [ERROR, 'always'],
    'flowtype/generic-spacing': OFF,
  },
};
