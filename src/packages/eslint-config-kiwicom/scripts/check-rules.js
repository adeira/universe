// Finds rules that are supported by ESLint but not defined in our config.
// Because explicit is better than implicit.

// @flow

// TODO: convert it into the tests
// node src/packages/eslint-config-kiwicom/scripts/check-rules.js

const path = require('path');
const eslintRules = require('eslint/lib/load-rules');

// $FlowIssue: https://github.com/facebook/flow/issues/2692
const eslintConfig = require(path.join(__dirname, '..', 'index.js'));

const ourRules = new Set(Object.keys(eslintConfig.rules));
const supportedRules = new Set(Object.keys(eslintRules()));

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

console.log('missing', missing); // eslint-disable-line no-console
// console.log('extra', extra); // eslint-disable-line no-console
