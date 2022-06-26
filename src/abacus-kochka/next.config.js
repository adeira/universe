// @flow

/* eslint-disable import/order */

const path = require('path');
const withPlugins = require('next-compose-plugins');

const withCustomBabelConfigFile = require('next-plugin-custom-babel-config')({
  babelConfigFile: path.join(__dirname, '.babelrc.js'),
});

const withTranspileModules = require('next-transpile-modules')([
  '@adeira/css-colors',
  '@adeira/fetch',
  '@adeira/hooks',
  '@adeira/icons',
  '@adeira/js',
  '@adeira/murmur-hash',
  '@adeira/relay',
  '@adeira/sx',
  '@adeira/sx-design',
]);

module.exports = (withPlugins(
  [
    [withCustomBabelConfigFile],
    [withTranspileModules],
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
      defaultLocale: 'es-mx',
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    experimental: {
      esmExternals: 'loose',
      runtime: 'nodejs',
    },
    webpack: (nextConfig) => {
      nextConfig.module.rules.push({
        type: 'javascript/auto',
        test: /\.mjs$/,
      });

      return nextConfig;
    },
  },
) /*: $FlowFixMe */);
