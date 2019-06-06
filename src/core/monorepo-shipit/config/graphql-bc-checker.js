// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'graphql-bc-checker',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/packages/graphql-bc-checker/', '']]);
  },
};
