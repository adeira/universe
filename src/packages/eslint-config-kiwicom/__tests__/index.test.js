// Finds rules that are supported by ESLint but not defined in our config.
// Because explicit is better than implicit.

// @flow

const path = require('path');
const eslintRules = require('eslint/lib/load-rules');

// $FlowAllowDynamicImport
const eslintConfig = require(path.join(__dirname, '..', 'index.js'));

const ourRules = new Set(Object.keys(eslintConfig.rules));
const supportedRules = new Set(Object.keys(eslintRules()));

// see: https://eslint.org/docs/rules/#deprecated
const deprecatedRules = new Set([
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
]);

// Get plugins from package.json. Assume they're all in dependencies.
const plugins = Object.keys(require('../package.json').dependencies)
  .filter(dep => dep.startsWith('eslint-plugin'))
  .filter(dep => {
    // we are not testing every 3rd party plugins yet
    const whitelistedPlugins = ['eslint-plugin-babel'];
    return whitelistedPlugins.includes(dep);
  })
  .map(dep => dep.replace('eslint-plugin-', ''));

plugins.forEach(plugin => {
  // $FlowAllowDynamicImport
  Object.keys(require(`eslint-plugin-${plugin}`).rules).forEach(rule => {
    supportedRules.add(`${plugin}/${rule}`);
  });
});

const missing = new Set();
const extra = new Set();
const deprecated = new Set();

ourRules.forEach(rule => {
  if (deprecatedRules.has(rule)) {
    deprecated.add(rule);
  }
});

deprecatedRules.forEach(rule => {
  ourRules.add(rule);
});

ourRules.forEach(rule => {
  if (!supportedRules.has(rule)) {
    extra.add(rule);
  }
});

supportedRules.forEach(rule => {
  if (!ourRules.has(rule)) {
    missing.add(rule);
  }
});

test('missing Eslint rules', () => {
  expect(missing).toEqual(new Set());
});

test('deprecated Eslint rules', () => {
  expect(deprecated).toEqual(new Set());
});

// TODO: test extra rules:
// console.log('extra', extra); // eslint-disable-line no-console
