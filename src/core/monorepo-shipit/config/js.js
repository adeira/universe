// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/js.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([['src/packages/js/', '']]);
  },
};
