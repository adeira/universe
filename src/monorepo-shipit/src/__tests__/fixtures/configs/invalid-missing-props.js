// @flow strict

module.exports = {
  // getStaticConfig missing
  getPathMappings(): Map<string, string> {
    return new Map([['src/apps/example-relay/', '']]);
  },
};
