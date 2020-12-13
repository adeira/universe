// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/monorepo-utils.git',
    };
  },
  getPathMappings() {
    return new Map([['src/monorepo-utils/', '']]);
  },
}: ConfigType);
