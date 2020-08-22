// @flow

import * as sx from '../index';

sx.create({
  NoIssues: {
    color: 'red',
    zIndex: 10,
  },
  InvalidPropertyValue: {
    // $FlowExpectedError[incompatible-call]
    alignContent: 'unknown',
  },
  InvalidPropertyType: {
    // $FlowExpectedError[incompatible-call]
    zIndex: '10',
  },
});
