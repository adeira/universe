// @flow strict

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

module.exports = {
  title: 'adeira/universe', // Title for your website.
  tagline: 'Universe by Adeira is collection of libs to write better code.',
  url: 'https://adeira.dev/',
  baseUrl: '/adeira/universe/',
  editUrl: 'https://github.com/adeira/universe/tree/master/src/docs/docs/',
  cname: 'adeira.dev',

  customDocsPath: 'docs/docs',

  // Used for publishing and more
  projectName: 'graphql',
  organizationName: 'adeira',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: 'general/introduction', label: 'Docs' },
    {
      href: 'https://github.com/adeira/universe',
      label: 'GitHub',
    },
  ],

  // If you have users set above, you add it here:
  users: [],

  /* path to images for header/footer */
  headerIcon: 'img/logo-transparent.png', // TODO: svg
  footerIcon: 'img/logo-transparent.png', // TODO: svg

  favicon: 'img/favicons/favicon.ico',
  manifest: 'img/favicons/manifest.json',

  /* Colors for website */
  colors: {
    primaryColor: '#000000',
    secondaryColor: '#004ba0',
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © 2017 - 2019 Kiwi.com, 2019 - ${new Date().getFullYear()} Adeira`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/logo-transparent.png',
  twitterImage: 'img/logo-transparent.png',

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  docsSideNavCollapsible: false,

  scrollToTop: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
  // algolia: { ... },
};
