// @flow strict

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
  plugins: ['babel-plugin-fbt', 'babel-plugin-fbt-runtime', 'relay'],
};
