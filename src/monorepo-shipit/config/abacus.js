// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/abacus.git',
    };
  },
  getPathMappings() {
    return new Map([['src/abacus/', '']]);
  },
}: ConfigType);
