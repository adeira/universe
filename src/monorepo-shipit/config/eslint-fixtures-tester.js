// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/eslint-fixtures-tester.git',
    };
  },
  getPathMappings() {
    return new Map([['src/eslint-fixtures-tester/', '']]);
  },
}: ConfigType);
