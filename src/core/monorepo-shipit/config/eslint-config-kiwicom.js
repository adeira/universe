// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/eslint-config-kiwicom.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([['src/packages/eslint-config-kiwicom/', '']]);
  },
};
