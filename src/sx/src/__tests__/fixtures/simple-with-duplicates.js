// @flow

import type { SheetDefinitions } from '../../create';

/* eslint-disable no-dupe-keys */

export default ({
  aaa: {
    color: 'red',
  },
  bbb: {
    color: 'red',
  },
  ccc: {
    color: 'red', // duplicated on purpose
    color: 'red', // duplicated on purpose
  },
}: SheetDefinitions);
