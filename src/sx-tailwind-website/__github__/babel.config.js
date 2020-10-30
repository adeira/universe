// @flow strict

/*::

type ApiType = {|
  +assertVersion: number => void,
  +cache: {|
    forever: () => void,
  |},
|};

type BabelConfig = {|
  +presets: $ReadOnlyArray<string>,
  +plugins: $ReadOnlyArray<string>,
|}

*/

module.exports = function (api /*: ApiType */) /*: BabelConfig */ {
  api.assertVersion(7);
  api.cache.forever();

  return {
    presets: ['@adeira/babel-preset-adeira', 'next/babel'],
    plugins: ['@adeira/babel-plugin-transform-sx-tailwind'],
  };
};
