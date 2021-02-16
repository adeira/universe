// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/sx-design.git',
    };
  },
  getPathMappings() {
    return new Map([['src/sx-design/', '']]);
  },
}: ConfigType);
