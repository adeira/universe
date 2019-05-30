// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'eslint-plugin-kiwicom-incubator',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/packages/eslint-plugin-kiwicom-incubator/', '']]);
  },
};
