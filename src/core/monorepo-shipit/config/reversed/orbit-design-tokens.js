// @flow strict

module.exports = {
  getStaticConfig() {
    return {
      repository: 'git@github.com:kiwicom/orbit-design-tokens.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([['src/platform/orbit-design-tokens/', '']]);
  },
};
