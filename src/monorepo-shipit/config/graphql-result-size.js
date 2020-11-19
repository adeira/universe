// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/graphql-result-size.git',
    };
  },
  getPathMappings() {
    return new Map([['src/graphql-result-size/', '']]);
  },
}: ConfigType);
