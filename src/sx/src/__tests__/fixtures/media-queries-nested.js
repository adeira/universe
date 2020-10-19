// @flow

import type { SheetDefinitions } from '../../create';

export default ({
  test: {
    '@media print': {
      'color': 'red',
      '@media (max-width: 12cm)': {
        color: 'blue',
      },
    },
  },
}: SheetDefinitions);
