// @flow

import type { SheetDefinitions } from '../../create';

export default ({
  // $FlowExpectedError[prop-missing]: nested pseudo classes are not allowed in Flow types
  test: {
    ':hover': {
      'color': 'red',
      ':hover': {
        'color': 'green',
        ':hover': {
          color: 'blue',
        },
      },
    },
  },
}: SheetDefinitions);
