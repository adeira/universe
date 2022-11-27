// @flow

/* eslint-disable import/order */

const path = require('path');
const withPlugins = require('next-compose-plugins');
const { withSentryConfig } = require('@sentry/nextjs');

const withCustomBabelConfigFile = require('next-plugin-custom-babel-config')({
  babelConfigFile: path.join(__dirname, '.babelrc.js'),
});

const withTranspileModules = require('next-transpile-modules')([
  '@adeira/css-colors',
  '@adeira/forms',
  '@adeira/hooks',
  '@adeira/icons',
  '@adeira/js',
  '@adeira/murmur-hash',
  '@adeira/react-auth',
  '@adeira/relay',
  '@adeira/sx',
  '@adeira/sx-design',
  '@adeira/sx-design-headless',
]);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// https://docs.sentry.io/platforms/javascript/guides/nextjs/
const withSentryConfigPlugin = withSentryConfig(
  { sentry: { hideSourceMaps: true } },
  { silent: true },
);

module.exports = (withPlugins(
  [
    [withCustomBabelConfigFile],
    [withSentryConfigPlugin],
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
    headers() {
      return [
        {
          // Apply these headers to all routes in the application:
          source: '/:path*',
          headers: [
            {
              // This header controls DNS prefetching, allowing browsers to proactively perform
              // domain name resolution on external links, images, CSS, JavaScript, and more.
              // This prefetching is performed in the background, so the DNS is more likely to be
              // resolved by the time the referenced items are needed. This reduces latency when
              // the user clicks a link.
              key: 'X-DNS-Prefetch-Control',
              value: 'on',
            },
            {
              // This header stops pages from loading when they detect reflected cross-site
              // scripting (XSS) attacks. Although this protection is not necessary when sites
              // implement a strong `Content-Security-Policy` disabling the use of inline
              // JavaScript ('unsafe-inline'), it can still provide protection for older web
              // browsers that don't support CSP.
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
            {
              // This header indicates whether the site should be allowed to be displayed within
              // an iframe. This can prevent against clickjacking attacks. This header has been
              // superseded by CSP's frame-ancestors option, which has better support in modern
              // browsers.
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN',
            },
            {
              // This header prevents the browser from attempting to guess the type of content if
              // the Content-Type header is not explicitly set. This can prevent XSS exploits for
              // websites that allow users to upload and share files. For example, a user trying to
              // download an image, but having it treated as a different Content-Type like an
              // executable, which could be malicious. This header also applies to downloading
              // browser extensions. The only valid value for this header is `nosniff`.
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Content-Security-Policy-Report-Only',
              value:
                "default-src 'self'; report-uri https://o74963.ingest.sentry.io/api/4504227233071104/security/?sentry_key=fce56c4ba748422b93247bbf949af9f1",
            },
          ],
        },
      ];
    },
  },
) /*: $FlowFixMe */);
