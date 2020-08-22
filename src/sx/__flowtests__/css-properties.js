// @flow

import * as sx from '../index';

sx.create({
  NoIssues: {
    color: 'red',
    zIndex: 10,
  },
  // $FlowExpectedError[incompatible-call]
  InvalidPropertyValue: {
    alignContent: 'unknown',
  },
  // $FlowExpectedError[incompatible-call]
  InvalidPropertyType: {
    zIndex: '10',
  },
});
