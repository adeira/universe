// @flow

/* eslint-disable import/no-extraneous-dependencies */

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

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
            colors: {
              white: colors.white,
              transparent: 'transparent',
              blue: colors.blue,
              gray: colors.trueGray,
              indigo: colors.indigo,
              orange: colors.orange,
              pink: colors.pink,
              purple: colors.purple,
              red: colors.rose,
              teal: colors.teal,
            },
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
