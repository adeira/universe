// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/abacus-kochka.git',
    };
  },
  getPathMappings() {
    return new Map([['src/abacus-kochka/', '']]);
  },
}: ConfigType);
