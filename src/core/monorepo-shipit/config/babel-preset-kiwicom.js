// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'babel-preset-kiwicom',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/packages/babel-preset-kiwicom/', '']]);
  },
};
