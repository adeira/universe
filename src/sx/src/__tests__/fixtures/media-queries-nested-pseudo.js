// @flow

import type { SheetDefinitions } from '../../create';

export default ({
  media: {
    'color': 'red',
    '@media print': {
      'color': 'red',
      ':hover': {
        color: 'pink',
      },
    },
  },
}: SheetDefinitions);
