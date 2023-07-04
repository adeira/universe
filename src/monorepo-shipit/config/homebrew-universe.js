// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/homebrew-universe.git',
    };
  },
  getPathMappings() {
    return new Map([['src/homebrew-universe/', '']]);
  },
}: ConfigType);
