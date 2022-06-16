// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/graphql-global-id.git',
    };
  },
  getPathMappings() {
    return new Map([['src/graphql-global-id/', '']]);
  },
}: ConfigType);
