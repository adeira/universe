// @flow

import type { SheetDefinitions } from '../../create';

export default ({
  test: {
    'color': 'red',
    '@media print': {
      color: 'red',
    },
    '@media (min-width: 30em) and (max-width: 50em)': {
      color: 'blue',
    },
  },
}: SheetDefinitions);
