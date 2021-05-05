// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/monorepo-npm-publisher.git',
    };
  },
  getPathMappings() {
    return new Map([['src/monorepo-npm-publisher/', '']]);
  },
}: ConfigType);
