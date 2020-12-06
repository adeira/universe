// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/css-colors.git',
    };
  },
  getPathMappings() {
    return new Map([['src/css-colors/', '']]);
  },
}: ConfigType);
