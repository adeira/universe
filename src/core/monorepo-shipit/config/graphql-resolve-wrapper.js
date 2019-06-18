// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com/kiwicom/graphql-resolve-wrapper.git',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/packages/graphql-resolve-wrapper/', '']]);
  },
};
