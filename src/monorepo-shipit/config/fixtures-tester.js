// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/fixtures-tester.git',
    };
  },
  getPathMappings() {
    return new Map([['src/fixtures-tester/', '']]);
  },
}: ConfigType);
