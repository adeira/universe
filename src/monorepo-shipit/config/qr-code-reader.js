// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/qr-code-reader.git',
    };
  },
  getPathMappings() {
    return new Map([['src/qr-code-reader/', '']]);
  },
}: ConfigType);
