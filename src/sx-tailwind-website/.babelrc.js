// @flow strict

module.exports = {
  presets: ['@adeira/babel-preset-adeira', 'next/babel'],
  env: {
    production: {
      // Use only in build, issues with hot reload in dev
      plugins: ['@adeira/babel-plugin-transform-sx-tailwind'],
    },
  },
};
