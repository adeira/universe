// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'eslint-config-kiwicom',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/packages/eslint-config-kiwicom/', '']]);
  },
};
