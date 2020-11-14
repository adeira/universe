// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/adeira.dev.git',
    };
  },
  getPathMappings() {
    return new Map([
      ['src/adeira.dev/__github__/babel.config.js', 'babel.config.js'],
      ['src/adeira.dev/', ''],
    ]);
  },
  getStrippedFiles() {
    return new Set([/__github__/, /^\.babelrc\.js$/]);
  },
}: ConfigType);
