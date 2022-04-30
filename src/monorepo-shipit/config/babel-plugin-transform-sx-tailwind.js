// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/babel-plugin-transform-sx-tailwind.git',
    };
  },
  getPathMappings() {
    return new Map([['src/babel-plugin-transform-sx-tailwind/', '']]);
  },
}: ConfigType);
