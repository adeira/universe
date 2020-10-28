// @flow

import type { SheetDefinitions } from '../../create';

export default ({
  ul: {
    counterReset: 'my-reset',
  },
  li: {
    'counterIncrement': 'my-reset',
    '::before': {
      content: 'counter(my-reset)',
    },
  },
}: SheetDefinitions);
