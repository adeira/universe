// @flow strict

module.exports = (new Set([
  // https://eslint.org/docs/rules/#deprecated
  'indent-legacy', // indent
  'lines-around-directive', // padding-line-between-statements
  'newline-after-var', // padding-line-between-statements
  'newline-before-return', // padding-line-between-statements
  'no-catch-shadow', // no-shadow
  'no-native-reassign', // no-global-assign
  'no-negated-in-lhs', // no-unsafe-negation
  'no-spaced-func', // func-call-spacing
  'prefer-reflect', // (no replacement)

  // https://github.com/babel/eslint-plugin-babel#deprecated
  'babel/array-bracket-spacing', // array-bracket-spacing
  'babel/arrow-parens', // arrow-parens
  'babel/flow-object-type', // flowtype/object-type-delimiter
  'babel/func-params-comma-dangle', // comma-dangle
  'babel/generator-star-spacing', // generator-star-spacing
  'babel/no-await-in-loop', // no-await-in-loop
  'babel/object-shorthand', // object-shorthand

  // https://github.com/mysticatea/eslint-plugin-node#deprecated-rules
  'node/no-hide-core-modules',
  'node/no-unsupported-features',

  'jest/no-try-expect', // https://github.com/jest-community/eslint-plugin-jest/commit/6d07cadd5f78ed7a64a86792931d49d3cd943d69
]) /*: Set<string> */);
