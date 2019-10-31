// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/eslint-plugin-kiwicom-incubator.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([['src/packages/eslint-plugin-kiwicom-incubator/', '']]);
  },
};
