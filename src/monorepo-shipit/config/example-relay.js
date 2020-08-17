// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/relay-example.git',
    };
  },
  getPathMappings() {
    return new Map([
      ['src/example-relay/__github__/.flowconfig', '.flowconfig'],
      ['src/example-relay/__github__/babel.config.js', 'babel.config.js'],
      ['src/example-relay/__github__/flow-typed', 'flow-typed'],
      ['src/example-relay/__github__/.github', '.github'],
      ['src/example-relay/', ''],
    ]);
  },
  getStrippedFiles() {
    return new Set([/__github__/, /^\.babelrc\.js$/]);
  },
}: ConfigType);
