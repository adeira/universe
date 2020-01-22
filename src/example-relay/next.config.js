// @flow

const path = require('path');
const withTranspileModules = require('next-transpile-modules');
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config');

module.exports = withCustomBabelConfigFile(
  withTranspileModules(['@adeira'])({
    babelConfigFile: path.join(
      __dirname,
      // @x-shipit-enable: 'babel.config.js',
      '.babelrc', // @x-shipit-disable
    ),
  }),
);
