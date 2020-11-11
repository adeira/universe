// @flow

const defaultTheme = require('tailwindcss/defaultTheme');

/*::

type ApiType = {|
  +assertVersion: number => void,
  +cache: {|
    forever: () => void,
  |},
|};

type BabelConfig = {|
  +presets: $ReadOnlyArray<string | [string, { ... }]>,
  +plugins: $ReadOnlyArray<string | [string, { ... }]>,
|}

*/

module.exports = function (api /*: ApiType */) /*: BabelConfig */ {
  api.assertVersion(7);
  api.cache.forever();

  return {
    presets: ['@adeira/babel-preset-adeira', 'next/babel'],
    plugins: [
      [
        '@adeira/babel-plugin-transform-sx-tailwind',
        {
          theme: {
            extend: {
              fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
              },
            },
          },
        },
      ],
    ],
  };
};
