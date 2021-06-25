// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/sx-tailwind.git',
    };
  },
  getPathMappings() {
    return new Map([['src/sx-tailwind/', '']]);
  },
}: ConfigType);
