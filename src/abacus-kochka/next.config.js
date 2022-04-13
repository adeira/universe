// @flow

const path = require('path');
const withTranspileModules = require('next-transpile-modules');
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config');

const nextConfig = withCustomBabelConfigFile(
  withTranspileModules([
    '@adeira/css-colors',
    '@adeira/fetch',
    '@adeira/hooks',
    '@adeira/icons',
    '@adeira/js',
    '@adeira/murmur-hash',
    '@adeira/relay',
    '@adeira/sx',
    '@adeira/sx-design',
  ])({
    babelConfigFile: path.join(__dirname, '.babelrc.js'),
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
    defaultLocale: 'es-mx',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    esmExternals: 'loose',
  },
} /*: any */);
