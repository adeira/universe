// @flow strict

const styleXPlugin = require('@stylexjs/babel-plugin');

module.exports = {
  presets: [
    [
      '@adeira/babel-preset-adeira',
      {
        target:
          process.env.NODE_ENV === 'test'
            ? 'js' // Jest doesn't support ES6 modules by default.
            : 'js-esm', // To support dynamic `import(…)` for `@adeira/icons`.
      },
    ],
  ],
  plugins: [
    [
      styleXPlugin,
      {
        // https://stylexjs.com/docs/api/configuration/babel-plugin/
        dev: process.env.NODE_ENV === 'development',
        test: false,
        treeshakeCompensation: true,

        // Required for CSS variable support
        unstable_moduleResolution: {
          type: 'commonJS',
          rootDir: __dirname, // The absolute path to the root directory of the project
        },
      },
    ],
  ],
};
