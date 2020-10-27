// @flow strict

import type { ConfigType } from '../ConfigType.flow';

module.exports = ({
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/sx-tailwind-website.git',
    };
  },
  getPathMappings() {
    return new Map([
      ['src/sx-tailwind-website/__github__/.flowconfig', '.flowconfig'],
      ['src/sx-tailwind-website/__github__/.babelrc.js', '.babelrc.js'],
      ['src/sx-tailwind-website/__github__/flow-typed', 'flow-typed'],
      ['src/sx-tailwind-website/__github__/.github', '.github'],
      ['src/sx-tailwind-website/', ''],
    ]);
  },
  getStrippedFiles() {
    return new Set([/__github__/, /^next\.config\.js$/]);
  },
}: ConfigType);
