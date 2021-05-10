// @flow

import type { SheetDefinitions } from '../../create';

export default ({
  test: {
    '@supports (display: grid)': {
      display: 'grid',
    },
    '@supports not (display: grid)': {
      float: 'right',
    },
  },
  testComplex: {
    '@supports (display: table-cell) and ((display: list-item) and (display:run-in))': {
      color: 'red',
    },
    '@supports (transform-style: preserve) or (-moz-transform-style: preserve) or (-o-transform-style: preserve) or (-webkit-transform-style: preserve)':
      {
        color: 'red',
      },
  },
}: SheetDefinitions);
