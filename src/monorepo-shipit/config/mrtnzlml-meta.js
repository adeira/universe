// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:mrtnzlml/meta.git',
    };
  },
  getPathMappings() {
    return new Map([['src/mrtnzlml-meta/', '']]);
  },
}: ConfigType);
