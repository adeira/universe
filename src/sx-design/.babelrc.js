// @flow strict

import styleXPlugin from '@stylexjs/babel-plugin';

module.exports = {
  presets: ['@adeira/babel-preset-adeira'],
  plugins: [
    'babel-plugin-fbt',
    'babel-plugin-fbt-runtime',
    [
      styleXPlugin,
      {
        // https://stylexjs.com/docs/api/configuration/babel-plugin/
        dev: true,
        test: false,

        // Required for CSS variable support
        unstable_moduleResolution: {
          type: 'commonJS',
          rootDir: __dirname, // The absolute path to the root directory of the project
        },
      },
    ],
  ],
};
