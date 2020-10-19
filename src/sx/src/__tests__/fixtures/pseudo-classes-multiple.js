// @flow

import type { SheetDefinitions } from '../../create';

export default ({
  aaa: {
    'textDecoration': 'none',
    ':hover': {
      textDecoration: 'none',
      color: 'red',
    },
    ':active': {
      color: 'red',
    },
  },
  bbb: {
    ':hover': {
      color: 'blue',
    },
  },
}: SheetDefinitions);
