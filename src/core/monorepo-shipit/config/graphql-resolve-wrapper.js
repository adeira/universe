// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'graphql-resolve-wrapper',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/packages/graphql-resolve-wrapper/', '']]);
  },
};
