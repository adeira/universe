// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/eslint-config-adeira.git',
    };
  },
  getPathMappings() {
    return new Map([['src/eslint-config-adeira/', '']]);
  },
}: ConfigType);
