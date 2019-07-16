// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/graphql-global-id.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([['src/packages/graphql-global-id/', '']]);
  },
};
