// @flow

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  title: 'GraphQL', // Title for your website.
  tagline: 'Documentation for GraphQL at Kiwi.com',
  url: 'https://kiwi.wiki',
  baseUrl: '/graphql/graphql/',
  editUrl:
    'https://gitlab.skypicker.com/graphql/graphql/edit/master/src/apps/docusaurus/docs/',

  customDocsPath: 'docusaurus/docs',

  // Used for publishing and more
  projectName: 'graphql',
  organizationName: 'kiwicom',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [{ doc: 'installation', label: 'Docs' }],

  // If you have users set above, you add it here:
  users: [],

  /* path to images for header/footer */
  headerIcon: 'img/logo-white.png', // TODO: svg
  footerIcon: 'img/logo-white.png', // TODO: svg

  /* Colors for website */
  colors: {
    primaryColor: '#D03195',
    secondaryColor: '#205C3B',
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Kiwi.com`,

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
  ogImage: 'img/logo-white.png',
  twitterImage: 'img/logo-white.png',

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
