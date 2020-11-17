// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/eslint-plugin-sx.git',
    };
  },
  getPathMappings() {
    return new Map([['src/eslint-plugin-sx/', '']]);
  },
}: ConfigType);
