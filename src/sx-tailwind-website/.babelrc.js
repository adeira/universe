// @flow strict

module.exports = {
  presets: ['@adeira/babel-preset-adeira', 'next/babel'],
  plugins: [
    [
      '@adeira/babel-plugin-transform-sx-tailwind',
      {
        "theme": {
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
