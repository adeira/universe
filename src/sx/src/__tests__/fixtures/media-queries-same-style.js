// @flow

import type { SheetDefinitions } from '../../create';

export default ({
  style1: {
    '@media (min-width: 1280px)': {
      color: 'red',
    },
    'color': 'blue',
  },
  style2: {
    color: 'red',
  },
}: SheetDefinitions);
