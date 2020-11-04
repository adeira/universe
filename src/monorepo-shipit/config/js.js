// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/js.git',
    };
  },
  getPathMappings() {
    return new Map([['src/js/', '']]);
  },
}: ConfigType);
