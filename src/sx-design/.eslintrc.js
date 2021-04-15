// @flow strict

/* eslint-disable no-unused-vars */
const OFF = 0;
const WARN = 1;
const ERROR = 2;
/* eslint-enable no-unused-vars */

module.exports = {
  env: {
    browser: true,
  },
  rules: {
    // TODO: this should be true for all users of `@adeira/sx-design` so we should make it reusable?
    'react/forbid-elements': [
      'error',
      {
        forbid: [
          { element: 'a', message: 'use <Link> instead' },
          { element: 'button', message: 'use <Button> instead' },
          { element: 'h1', message: 'use <Heading> instead' },
          { element: 'h2', message: 'use <Heading> instead' },
          { element: 'h3', message: 'use <Heading> instead' },
          { element: 'h4', message: 'use <Heading> instead' },
          { element: 'h5', message: 'use <Heading> instead' },
          { element: 'h6', message: 'use <Heading> instead' },
          { element: 'kbd', message: 'use <Kbd> instead' },
          { element: 'section', message: 'use <Section> instead' },
        ],
      },
    ],
  },
};
