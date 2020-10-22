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
  +env: {|
    +production: {|
      +plugins: $ReadOnlyArray<string>,
    |}
  |}
|}

*/

module.exports = function (api /*: ApiType */) /*: BabelConfig */ {
  api.assertVersion(7);
  api.cache.forever();

  return {
    presets: ['@adeira/babel-preset-adeira', 'next/babel'],
    env: {
      production: {
        // Use only in build, issues with hot reload in dev
        plugins: ['@adeira/babel-plugin-transform-sx-tailwind'],
      },
    },
  };
};
