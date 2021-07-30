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
          { element: 'a', message: 'use <Link/> or <LinkButton/> instead' },
          { element: 'button', message: 'use <Button/> or <ButtonLink/> instead' },
          { element: 'h1', message: 'use <Text as="h1"/> instead' },
          { element: 'h2', message: 'use <Text as="h2"/> instead' },
          { element: 'h3', message: 'use <Text as="h3"/> instead' },
          { element: 'h4', message: 'use <Text as="h4"/> instead' },
          { element: 'h5', message: 'use <Text as="h5"/> instead' },
          { element: 'h6', message: 'use <Text as="h6"/> instead' },
          { element: 'img', message: 'use <Image/> instead' },
          { element: 'kbd', message: 'use <Kbd/> instead' },
        ],
      },
    ],
  },
};
