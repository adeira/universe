// @flow

const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const withTranspileModules = require('next-transpile-modules');
// eslint-disable-next-line import/no-extraneous-dependencies
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config');

module.exports = (withCustomBabelConfigFile(
  withTranspileModules(['@adeira/css-colors', '@adeira/js', '@adeira/murmur-hash', '@adeira/sx'])({
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
