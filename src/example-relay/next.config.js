// @flow

const path = require('path');
const withTranspileModules = require('next-transpile-modules');
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPlugins = require('next-compose-plugins');

const getTranspileWorkspaces = require('./scripts/getTranspileWorkspaces'); // @x-shipit-disable

const transpileWorkspaces = getTranspileWorkspaces(); // @x-shipit-disable
// @x-shipit-enable: const transpileWorkspaces = [];

module.exports = (withPlugins(
  [withBundleAnalyzer, withCustomBabelConfigFile, withTranspileModules(transpileWorkspaces)],
  {
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
    experimental: {
      esmExternals: 'loose',
    },
  },
) /*: any  */);
