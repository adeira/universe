// @flow strict

module.exports = {
  url: 'https://adeira.dev/',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  title: 'adeira/universe', // Title for your website.
  tagline: 'Universe of libs to write better code.',
  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],
  // Used for publishing and more
  projectName: 'adeira.dev',
  organizationName: 'adeira',
  themeConfig: {
    // You may provide arbitrary config keys to be used as needed by your
    // template. For example, if you need your repo's URL...
    //   repoUrl: 'https://github.com/facebook/test-site',
    // algolia: { ... },
    image: 'img/logo-transparent.png',
    navbar: {
      title: 'Adeira',
      logo: {
        src: 'img/logo-transparent.png',
        alt: 'Adeira.dev',
      },
      items: [
        // { to: 'docs/general/introduction', label: 'Docs', position: 'left' },
        {
          href: 'https://relay-example.adeira.dev/',
          label: 'Relay Example',
          position: 'left',
        },
        {
          href: 'https://sx-tailwind.adeira.dev/',
          label: 'SX Tailwind',
          position: 'left',
        },
        {
          href: 'https://github.com/adeira/universe',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
      copyright: `Copyright © 2017 - 2019 Kiwi.com, 2019 - ${new Date().getFullYear()} Adeira`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        theme: {
          customCss: (require.resolve('./static/css/custom.css') /*: string */),
        },
        docs: {
          editUrl: 'https://github.com/adeira/universe/tree/master/src/docs/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          sidebarPath: (require.resolve('./sidebars.js') /*: string */),
        },
        scrollToTop: true,
      },
    ],
  ],
};
