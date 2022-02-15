// @flow

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'Martin Zlámal 🤓',
  tagline: 'My brain extension, personal README',
  url: 'https://mrtnzlml.com/',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'mrtnzlml', // Usually your GitHub org/user name.
  projectName: 'meta', // Usually your repo name.
  themeConfig: {
    prism: {
      // https://prismjs.com/#supported-languages
      additionalLanguages: [
        'rust',
        'reason', // ReScript
      ],
    },
    announcementBar: {
      id: 'github_sponsor', // Any value that will identify this message.
      content:
        '<strong>⭐️ Do you like this page? Help me to keep this page running via <a target="_blank" rel="noopener noreferrer" href="https://github.com/sponsors/mrtnzlml">GitHub Sponsors</a>! ⭐️</strong>',
      backgroundColor: '#25c2a0', // Defaults to `#fff`.
      // textColor: '#091E42', // Defaults to `#000`.
      isCloseable: false, // Defaults to `true`.
    },
    navbar: {
      // title: '👨‍💻',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        { to: 'til', label: 'TIL', position: 'left' },
        { to: 'docs/flow', label: 'Programming', position: 'left' },
        { to: 'docs/archive/flow', label: 'Archive', position: 'left' },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/mrtnzlml/meta',
          label: 'GitHub',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Martin Zlámal 🤓`,
    },
    algolia: {
      apiKey: '9178bd28d2e2a7795516d94878a57dfe',
      indexName: 'mrtnzlml',
      algoliaOptions: {}, // Optional, if provided by Algolia
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        blog: {
          path: 'til',
          routeBasePath: '/til',
          showReadingTime: false,
          blogTitle: 'Today I Learned',
          blogDescription: 'Today I Learned',
          blogSidebarCount: 0,
        },
        // TODO: docs=false (after moving everything to TIL)
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/mrtnzlml/meta/tree/master/',
          // showLastUpdateTime: true,
          // showLastUpdateAuthor: true,
          versions: {
            current: {
              label: 'current',
            },
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'UA-148481588-1',
        },
      },
    ],
  ],
};
