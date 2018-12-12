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
]);

// Get plugins from package.json. Assume they're all in peerDependencies.
//
// const plugins = Object.keys(require('../package.json').peerDependencies)
//   .filter(dep => dep.startsWith('eslint-plugin'))
//   .map(dep => dep.replace('eslint-plugin-', ''));
//
// const plugins = Object.keys(require('../package.json').devDependencies)
//   .filter(dep => dep.startsWith('eslint-plugin'))
//   .map(dep => dep.replace('eslint-plugin-', ''));
//
// plugins.forEach(plugin => {
//   Object.keys(require(`eslint-plugin-${plugin}`).rules).forEach(rule => {
//     supportedRules.add(`${plugin}/${rule}`);
//   });
// });

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
