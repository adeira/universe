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
    navbar: {
      title: 'About',
      // logo: {
      //   alt: 'My Site Logo',
      //   src: 'img/logo.svg',
      // },
      links: [
        { to: 'docs/flow', label: 'Meta', position: 'left' },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/mrtnzlml/meta',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      // links: [
      //   {
      //     title: 'Docs',
      //     items: [
      //       {
      //         label: 'Docs',
      //         to: 'docs/doc1',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Community',
      //     items: [
      //       {
      //         label: 'Discord',
      //         href: 'https://discordapp.com/invite/docusaurus',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Social',
      //     items: [
      //       {
      //         label: 'Blog',
      //         to: 'blog',
      //       },
      //     ],
      //   },
      // ],
      // logo: {
      //   alt: 'Facebook Open Source Logo',
      //   src: 'https://docusaurus.io/img/oss_logo.png',
      // },
      copyright: `Copyright © ${new Date().getFullYear()} Martin Zlámal, Built with Docusaurus.`,
    },
    googleAnalytics: {
      trackingID: 'UA-148481588-1',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
