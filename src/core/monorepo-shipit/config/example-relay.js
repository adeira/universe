// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/relay-example.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([
      ['src/incubator/example-relay/__github__/.flowconfig', '.flowconfig'],
      ['src/incubator/example-relay/__github__/babel.config.js', 'babel.config.js'],
      ['src/incubator/example-relay/', ''],
    ]);
  },
  getStrippedFiles(): Set<RegExp> {
    return new Set([/__github__/, /^\.babelrc\.js$/]);
  },
};
