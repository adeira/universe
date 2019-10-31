// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/babel-preset-kiwicom.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([['src/packages/babel-preset-kiwicom/', '']]);
  },
};
