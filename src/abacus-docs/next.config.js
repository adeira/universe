/* eslint-disable ft-flow/require-valid-file-annotation */

const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc()({
  reactStrictMode: true,
  pageExtensions: ['js', 'md', 'mdoc'],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  redirects() {
    return [
      {
        source: '/',
        destination: '/docs',
        permanent: false,
      },
      {
        source: '/docs',
        destination: '/docs/welcome',
        permanent: false,
      },
    ];
  },
});
