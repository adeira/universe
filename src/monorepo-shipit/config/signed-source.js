// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/signed-source.git',
    };
  },
  getPathMappings() {
    return new Map([['src/signed-source/', '']]);
  },
}: ConfigType);
