// @flow strict

module.exports = {
  defaultStrippedFiles() {
    // this configuration is not supported and should be removed (should be 'getStrippedFiles')
  },
  getStaticConfig() {
    return {
      repository: 'git@github.com/kiwicom/relay-example.git',
    };
  },
  getPathMappings(): Map<string, string> {
    return new Map([['src/apps/example-relay/', '']]);
  },
};
