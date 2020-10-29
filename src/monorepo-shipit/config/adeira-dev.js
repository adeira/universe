// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/adeira.dev.git',
    };
  },
  getPathMappings() {
    return new Map([['src/adeira.dev/', '']]);
  },
}: ConfigType);
