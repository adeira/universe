// @flow

const { NEXT_VERSION_ERROR } = require('../constants');

/*::

import type { EslintConfig } from '../EslintConfig.flow';

*/

module.exports = ({
  plugins: ['@next/eslint-plugin-next'],
  rules: {
    // Next.js (https://github.com/vercel/next.js/tree/canary/packages/eslint-plugin-next)
    '@next/next/google-font-display': NEXT_VERSION_ERROR,
    '@next/next/google-font-preconnect': NEXT_VERSION_ERROR,
    '@next/next/link-passhref': NEXT_VERSION_ERROR,
    '@next/next/no-css-tags': NEXT_VERSION_ERROR,
    '@next/next/no-document-import-in-page': NEXT_VERSION_ERROR,
    '@next/next/no-head-import-in-document': NEXT_VERSION_ERROR,
    '@next/next/no-html-link-for-pages': NEXT_VERSION_ERROR,
    '@next/next/no-img-element': NEXT_VERSION_ERROR,
    '@next/next/no-page-custom-font': NEXT_VERSION_ERROR,
    '@next/next/no-sync-scripts': NEXT_VERSION_ERROR,
    '@next/next/no-title-in-document-head': NEXT_VERSION_ERROR,
    '@next/next/no-unwanted-polyfillio': NEXT_VERSION_ERROR,
  },
} /*: EslintConfig */);
