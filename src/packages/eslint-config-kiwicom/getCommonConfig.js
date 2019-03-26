// @flow

const prettierRules = require('./extraPrettierRules');

const ERROR = 2;

/**
 * This is basically copy-pasted detection from the React plugin except it doesn't
 * complain when React dependency is missing. It's because we except non-React environments.
 * See: https://github.com/yannickcr/eslint-plugin-react/blob/6bb160459383a2eeec5d65e3de07e37e997b5f1a/lib/util/version.js#L12
 */
function detectReactVersion() {
  try {
    const react = require('react'); // eslint-disable-line import/no-extraneous-dependencies
    return react.version;
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return '999.999.999';
    }
    throw error;
  }
}

module.exports = function getCommonConfig(rules /*: Object */) {
  return {
    rules: {
      ...rules,
      ...prettierRules,
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
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: [
            '.js',
            '.jsx',
            '.android.js',
            '.ios.js',
            '.native.js',
            '.web.js',
          ],
        },
      },
      react: {
        version: detectReactVersion(),
      },
    },

    globals: {
      // set each global variable name equal to true to allow the variable
      // to be overwritten or false to disallow overwriting
      __DEV__: false,
      FormData: false, // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    },

    plugins: [
      'eslint-plugin-babel',
      'eslint-plugin-flowtype',
      'eslint-plugin-jest',
      'eslint-plugin-prefer-object-spread',
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react-native',
      'eslint-plugin-relay',
      'eslint-plugin-import',
      'eslint-plugin-dependencies',
      'eslint-plugin-monorepo',
      'eslint-plugin-node',
      'eslint-plugin-eslint-comments',
      'eslint-plugin-kiwicom-incubator',
      'eslint-plugin-prettier',
    ],
  };
};
