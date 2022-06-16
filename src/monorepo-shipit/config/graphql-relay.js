// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/graphql-relay.git',
    };
  },
  getPathMappings() {
    return new Map([['src/graphql-relay/', '']]);
  },
}: ConfigType);
