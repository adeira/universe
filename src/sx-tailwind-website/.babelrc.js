// @flow strict

const colors = require('tailwindcss/colors')

module.exports = {
  presets: ['@adeira/babel-preset-adeira', 'next/babel'],
  plugins: [
    [
      '@adeira/babel-plugin-transform-sx-tailwind',
      {
        "theme": {
          colors: {
            white: '#fff',
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
          "extend": {
            "fontFamily": {
              "sans": [
                'Inter',
                'system-ui',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                '"Noto Sans"',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
                '"Noto Color Emoji"',
              ]
            }
          }
        }
      }
    ]
  ],
};
