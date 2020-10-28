// @flow

import type { SheetDefinitions } from '../../create';

export default ({
  link: {
    'textDecoration': 'none',
    ':hover': {
      textDecoration: 'underline',
    },
    '::after': {
      content: '"∞"',
    },
    '::before': {
      content: '"∞"',
    },
  },
}: SheetDefinitions);
