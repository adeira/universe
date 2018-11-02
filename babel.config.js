// @flow

/*::

type ApiType = {|
  +cache: {|
    forever: () => void
  |}
|}

*/

module.exports = function(api /*: ApiType */) {
  api.cache.forever();

  const presets = [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-flow',
  ];
  const plugins = [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
  ];

  return {
    presets,
    plugins,
  };
};
