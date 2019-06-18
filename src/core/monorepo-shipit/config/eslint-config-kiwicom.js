// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/eslint-config-kiwicom.git',
    };
  },
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/packages/eslint-config-kiwicom/', '']]);
  },
};
