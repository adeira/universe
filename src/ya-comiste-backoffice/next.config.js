// @flow

const path = require('path');
const withTranspileModules = require('next-transpile-modules');
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config');

module.exports = (withCustomBabelConfigFile(
  withTranspileModules([
    '@adeira/css-colors',
    '@adeira/fetch',
    '@adeira/js',
    '@adeira/murmur-hash',
    '@adeira/relay',
    '@adeira/sx',
  ])({
    babelConfigFile: path.join(__dirname, '.babelrc'),
    webpack: (config) => {
      config.module.rules.push({
        type: 'javascript/auto',
        test: /\.mjs$/,
      });

      return config;
    },
  }),
) /*: any */);
