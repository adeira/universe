// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/graphql-resolve-wrapper.git',
    };
  },
  getPathMappings() {
    return new Map([['src/graphql-resolve-wrapper/', '']]);
  },
}: ConfigType);
