// @flow

const path = require('path');
const withTranspileModules = require('next-transpile-modules');
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config');

const nextConfig = withCustomBabelConfigFile(
  withTranspileModules([
    '@adeira/css-colors',
    '@adeira/fetch',
    '@adeira/js',
    '@adeira/murmur-hash',
    '@adeira/relay',
    '@adeira/sx',
  ])({
    babelConfigFile: path.join(__dirname, '.babelrc'),
    webpack: (nextConfig) => {
      nextConfig.module.rules.push({
        type: 'javascript/auto',
        test: /\.mjs$/,
      });

      return nextConfig;
    },
  }),
);

module.exports = ({
  ...nextConfig,
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
} /*: any */);
