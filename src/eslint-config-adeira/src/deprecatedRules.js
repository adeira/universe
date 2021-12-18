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
  'id-blacklist', // id-denylist (https://github.com/eslint/eslint/commit/004adae3f959414f56e44e5884f6221e9dcda142)

  // https://github.com/babel/eslint-plugin-babel#deprecated
  'babel/array-bracket-spacing', // array-bracket-spacing
  'babel/arrow-parens', // arrow-parens
  'babel/flow-object-type', // flowtype/object-type-delimiter
  'babel/func-params-comma-dangle', // comma-dangle
  'babel/generator-star-spacing', // generator-star-spacing
  'babel/no-await-in-loop', // no-await-in-loop
  'babel/object-shorthand', // object-shorthand

  // https://github.com/weiran-zsd/eslint-plugin-node#deprecated-rules
  // https://github.com/mysticatea/eslint-plugin-node#deprecated-rules
  'n/no-hide-core-modules',
  'n/no-unsupported-features',
  'node/no-hide-core-modules',
  'node/no-unsupported-features',

  // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/search?q=%22deprecated%22
  'jsx-a11y/accessible-emoji',
  'jsx-a11y/label-has-for', // label-has-associated-control
  'jsx-a11y/no-onchange',

  'jest/no-try-expect', // https://github.com/jest-community/eslint-plugin-jest/commit/6d07cadd5f78ed7a64a86792931d49d3cd943d69
]) /*: Set<string> */);
