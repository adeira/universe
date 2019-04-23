// @flow

module.exports = {
  // getStaticConfig missing
  getDefaultPathMappings(): Map<string, string> {
    return new Map([['src/apps/example-relay/', '']]);
  },
};
