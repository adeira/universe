// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/flow-config-parser.git',
    };
  },
  getPathMappings() {
    return new Map([['src/flow-config-parser/', '']]);
  },
}: ConfigType);
