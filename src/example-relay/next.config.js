// @flow

const path = require('path');
const withTranspileModules = require('next-transpile-modules');
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config');

const getTranspileWorkspaces = require('./scripts/getTranspileWorkspaces'); // @x-shipit-disable

const transpileWorkspaces = getTranspileWorkspaces(); // @x-shipit-disable
// @x-shipit-enable: const transpileWorkspaces = [];

module.exports = (withCustomBabelConfigFile(
  withTranspileModules(transpileWorkspaces)({
    images: {
      domains: ['images.kiwi.com'],
    },
    babelConfigFile: path.join(
      __dirname,
      // @x-shipit-enable: 'babel.config.js',
      '.babelrc.js', // @x-shipit-disable
    ),
    webpack: (config) => {
      config.module.rules.push({
        type: 'javascript/auto',
        test: /\.mjs$/,
      });

      return config;
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
) /*: any */);
