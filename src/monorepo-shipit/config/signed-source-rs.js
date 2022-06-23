// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/signed-source-rs.git',
    };
  },
  getPathMappings() {
    return new Map([['src/abacus/signedsource/', '']]);
  },
}: ConfigType);
