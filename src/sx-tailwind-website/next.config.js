// @flow

const path = require('path');
const withTranspileModules = require('next-transpile-modules');
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config');

module.exports = (withCustomBabelConfigFile(
  withTranspileModules([
    '@adeira/css-colors',
    '@adeira/js',
    '@adeira/monorepo-utils',
    '@adeira/murmur-hash',
    '@adeira/sx',
    '@adeira/sx-tailwind',
  ])({
    babelConfigFile: path.join(__dirname, '.babelrc.js'),
    webpack: (config) => {
      config.module.rules.push({
        type: 'javascript/auto',
        test: /\.mjs$/,
      });

      return config;
    },
  }),
) /*: any */);
