// @flow

import loadEslintRules from 'eslint/lib/load-rules';

const eslintRules = new Set<string>(Object.keys(loadEslintRules()));

Object.keys(require('./package.json').dependencies)
  .filter(dep => dep.startsWith('eslint-plugin'))
  .filter(dep => {
    // we are not testing every 3rd party plugins yet
    const whitelistedPlugins = [
      'eslint-plugin-babel',
      'eslint-plugin-jest',
      'eslint-plugin-monorepo',
    ];
    return whitelistedPlugins.includes(dep);
  })
  .map(dep => dep.replace('eslint-plugin-', ''))
  .forEach(plugin => {
    // $FlowAllowDynamicImport
    Object.keys(require(`eslint-plugin-${plugin}`).rules).forEach(rule => {
      eslintRules.add(`${plugin}/${rule}`);
    });
  });

export default eslintRules;
