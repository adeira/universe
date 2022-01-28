// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/abacus-backoffice.git',
    };
  },
  getPathMappings() {
    return new Map([['src/abacus-backoffice/', '']]);
  },
}: ConfigType);
