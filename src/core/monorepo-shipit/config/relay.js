// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/relay.git',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/packages/relay/', '']]);
  },
};
