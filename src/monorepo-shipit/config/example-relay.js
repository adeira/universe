// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:adeira/relay-example.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([
      ['src/example-relay/__github__/.flowconfig', '.flowconfig'],
      ['src/example-relay/__github__/babel.config.js', 'babel.config.js'],
      ['src/example-relay/__github__/flow-typed', 'flow-typed'],
      ['src/example-relay/__github__/.github', '.github'],
      ['src/example-relay/', ''],
    ]);
  },
  getStrippedFiles(): Set<RegExp> {
    return new Set([/__github__/, /^\.babelrc\.js$/, /scripts/]);
  },
};
