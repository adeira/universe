// @flow strict

// This list dedupes common string occurrences in our application so they don't have to be
// translated repeatedly and they are consistent. Use it carefully and only for key parts of our
// application.
//
// See: https://facebook.github.io/fbt/docs/common/
module.exports = {
  // Navigation links (we have 3 navigations: homepage, subpage title, subpage footer):
  'Café menu': 'navigation link to our café menu',
  'Café rules': 'navigation link to our café rules',
  'Shop': 'navigation link to our eshop',
};
