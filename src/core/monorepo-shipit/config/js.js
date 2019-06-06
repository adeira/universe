// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      githubOrg: 'kiwicom',
      githubProject: 'js',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/packages/js/', '']]);
  },
};
