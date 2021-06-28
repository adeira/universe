// @flow

import { rules as builtInRules } from 'eslint/conf/eslint-all';

const eslintRules: Set<string> = new Set(Object.keys(builtInRules));

Object.keys(require('../package.json').dependencies)
  .filter((dep) => dep.startsWith('eslint-plugin'))
  .map((dep) => dep.replace('eslint-plugin-', ''))
  .forEach((plugin) => {
    Object.keys(require(`eslint-plugin-${plugin}`).rules).forEach((rule) => {
      eslintRules.add(`${plugin}/${rule}`);
    });
  });

Object.keys(require(`@next/eslint-plugin-next`).rules).forEach((rule) => {
  eslintRules.add(`@next/next/${rule}`);
});

export default eslintRules;
