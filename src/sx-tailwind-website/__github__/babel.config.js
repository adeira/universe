// @flow strict

/*::

type ApiType = {|
  +assertVersion: number => void,
  +cache: {|
    forever: () => void,
  |},
|};

type BabelConfig = {|
  +presets: $ReadOnlyArray<string | [string, { ... }]>,
  +plugins: $ReadOnlyArray<string>,
|}

*/

module.exports = function (api /*: ApiType */) /*: BabelConfig */ {
  api.assertVersion(7);
  api.cache.forever();

  return {
    presets: [['@adeira/babel-preset-adeira', { reactRuntime: 'automatic' }], 'next/babel'],
    plugins: ['@adeira/babel-plugin-transform-sx-tailwind'],
  };
};
