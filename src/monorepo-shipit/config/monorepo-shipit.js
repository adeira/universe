// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/shipit.git',
    };
  },
  getPathMappings() {
    return new Map([['src/monorepo-shipit/', '']]);
  },
}: ConfigType);
