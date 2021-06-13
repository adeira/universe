// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/graphql-bc-checker.git',
    };
  },
  getPathMappings() {
    return new Map([['src/graphql-bc-checker/', '']]);
  },
}: ConfigType);
