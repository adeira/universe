// @flow

const { NEXT_VERSION_ERROR, OFF } = require('../constants');

/*::

import type { EslintConfig } from '../EslintConfig.flow';

*/

module.exports = ({
  plugins: ['@next/eslint-plugin-next'],
  rules: {
    // Next.js (https://github.com/vercel/next.js/tree/canary/packages/eslint-plugin-next)
    '@next/next/google-font-display': NEXT_VERSION_ERROR,
    '@next/next/google-font-preconnect': NEXT_VERSION_ERROR,
    '@next/next/inline-script-id': NEXT_VERSION_ERROR,
    '@next/next/link-passhref': NEXT_VERSION_ERROR,
    '@next/next/next-script-for-ga': OFF, // TODO: https://github.com/vercel/next.js/issues/28635
    '@next/next/no-css-tags': NEXT_VERSION_ERROR,
    '@next/next/no-document-import-in-page': NEXT_VERSION_ERROR,
    '@next/next/no-duplicate-head': NEXT_VERSION_ERROR,
    '@next/next/no-head-import-in-document': NEXT_VERSION_ERROR,
    '@next/next/no-html-link-for-pages': NEXT_VERSION_ERROR,
    '@next/next/no-img-element': NEXT_VERSION_ERROR,
    '@next/next/no-page-custom-font': NEXT_VERSION_ERROR,
    '@next/next/no-script-in-document': NEXT_VERSION_ERROR,
    '@next/next/no-script-in-head': NEXT_VERSION_ERROR,
    '@next/next/no-sync-scripts': NEXT_VERSION_ERROR,
    '@next/next/no-title-in-document-head': NEXT_VERSION_ERROR,
    '@next/next/no-typos': NEXT_VERSION_ERROR,
    '@next/next/no-unwanted-polyfillio': NEXT_VERSION_ERROR,
  },
} /*: EslintConfig */);
