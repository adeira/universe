// @flow

import type { SheetDefinitions } from '../../create';

export default ({
  test: {
    '@supports (display: grid)': {
      'color': 'red',
      '@supports not (display: grid)': {
        'color': 'blue',
        '@supports (display: table-cell) and ((display: list-item) and (display:run-in))': {
          color: 'orange',
        },
      },
    },
  },
}: SheetDefinitions);
