// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/relay.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([
      ['src/packages/relay/.eslintrc.js', '__STRIPPED__'], // our original Eslint config is being removed and replaced with the one from __github__
      ['src/packages/relay/__github__/flow-typed/', 'flow-typed/'],
      ['src/packages/relay/__github__/.eslintignore', '.eslintignore'],
      ['src/packages/relay/__github__/.eslintrc.js', '.eslintrc.js'],
      ['src/packages/relay/__github__/.flowconfig', '.flowconfig'],
      ['src/packages/relay/__github__/babel.config.js', 'babel.config.js'],
      ['src/packages/relay/__github__/jest.config.js', 'jest.config.js'],
      ['src/packages/relay/', ''],
    ]);
  },
  getStrippedFiles(): Set<RegExp> {
    return new Set([/__github__/, /^__STRIPPED__$/]);
  },
};
