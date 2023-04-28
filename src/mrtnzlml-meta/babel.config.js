/* eslint-disable ft-flow/require-valid-file-annotation */

module.exports = function (api) {
  api.assertVersion(7);
  api.cache(true);

  return {
    presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
  };
};
