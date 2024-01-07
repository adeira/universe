// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:rossumai-community/rossum-sa-extension.git',
    };
  },
  getPathMappings() {
    return new Map([['src/rossum-sa-extension/', '']]);
  },
}: ConfigType);
