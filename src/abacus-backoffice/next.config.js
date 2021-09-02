// @flow

/* eslint-disable import/order,import/no-extraneous-dependencies */

const path = require('path');
const withPlugins = require('next-compose-plugins');

const withCustomBabelConfigFile = require('next-plugin-custom-babel-config')({
  babelConfigFile: path.join(__dirname, '.babelrc.js'),
});

const withTranspileModules = require('next-transpile-modules')([
  '@adeira/css-colors',
  '@adeira/fetch',
  '@adeira/icons',
  '@adeira/js',
  '@adeira/murmur-hash',
  '@adeira/relay',
  '@adeira/sx',
]);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = (withPlugins(
  [
    [withCustomBabelConfigFile],
    [withTranspileModules],
    [withBundleAnalyzer],
    // other plugins here
  ],
  {
    poweredByHeader: false,
    reactStrictMode: true,
    devIndicators: {
      buildActivity: true,
    },
    i18n: {
      locales: [
        'en-us', // English in USA
        'es-mx', // Spanish in Mexico
      ],
      defaultLocale: 'en-us',
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    webpack: (nextConfig) => {
      nextConfig.module.rules.push({
        type: 'javascript/auto',
        test: /\.mjs$/,
      });
      return nextConfig;
    },
    experimental: {
      // https://github.com/vercel/next.js/issues/23725
      // https://github.com/vercel/next.js/pull/27069
      esmExternals: 'loose',
    },
  },
) /*: $FlowFixMe */);
