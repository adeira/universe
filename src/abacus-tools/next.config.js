// @flow

/* eslint-disable import/order */

const path = require('path');
const withPlugins = require('next-compose-plugins');

const withCustomBabelConfigFile = require('next-plugin-custom-babel-config')({
  babelConfigFile: path.join(__dirname, '.babelrc.js'),
});

module.exports = (withPlugins(
  [
    [withCustomBabelConfigFile],
    // other plugins here
  ],
  {
    poweredByHeader: false,
    reactStrictMode: true,
    devIndicators: {
      buildActivity: true,
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
