// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/graphql-global-id.git',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/packages/graphql-global-id/', '']]);
  },
};
