// @flow strict

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  presets: ['next/babel', '@adeira/babel-preset-adeira'],
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
