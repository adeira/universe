// @flow

import * as sx from '../index';

sx.create({
  NoIssues: {
    'color': 'red',
    'zIndex': 10,
    ':hover': {
      color: 'blue',
    },
    '::after': {
      content: '∞',
    },
  },
  InvalidPropertyValue: {
    // $FlowExpectedError[incompatible-call]
    alignContent: 'unknown',
  },
  InvalidPropertyType: {
    // $FlowExpectedError[incompatible-call]
    zIndex: '10',
  },
  UnknownProperty: {
    // $FlowExpectedError[incompatible-call]
    unknownProperty: 'red',
  },
});
