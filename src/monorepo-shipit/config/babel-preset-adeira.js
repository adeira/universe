// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/babel-preset-adeira.git',
    };
  },
  getPathMappings() {
    return new Map([['src/babel-preset-adeira/', '']]);
  },
}: ConfigType);
