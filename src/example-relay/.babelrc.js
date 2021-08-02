// @flow strict

module.exports = {
  presets: ['@adeira/babel-preset-adeira'],
  // For some unknown reason, we have to specify here the `class-properties` Babel plugin explicitly
  // even though it's already part of `@adeira/babel-preset-adeira`. Seems like `next/babel` preset
  // is somehow interfering with our preset because removing it fixes the issue as well.
  //
  // See: https://github.com/adeira/universe/issues/1854
  plugins: ['relay'],
};
