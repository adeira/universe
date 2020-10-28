// @flow

import type { SheetDefinitions } from '../../create';

export default ({
  test: {
    ':hover::after': {
      content: '"this is OK"',
    },
  },
}: SheetDefinitions);
