// @flow

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'graphql-global-id',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/packages/graphql-global-id/', '']]);
  },
};
