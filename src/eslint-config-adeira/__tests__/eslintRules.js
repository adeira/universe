// @flow

import { rules as builtInRules } from 'eslint/conf/eslint-all';

const eslintRules: Set<string> = new Set(Object.keys(builtInRules));

Object.keys(require('../package.json').dependencies)
  .filter((dep) => dep.startsWith('eslint-plugin'))
  .map((dep) => dep.replace('eslint-plugin-', ''))
  .forEach((plugin) => {
    // $FlowAllowDynamicImport
    Object.keys(require(`eslint-plugin-${plugin}`).rules).forEach((rule) => {
      eslintRules.add(`${plugin}/${rule}`);
    });
  });

export default eslintRules;
