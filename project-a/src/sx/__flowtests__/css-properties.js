// @flow

import sx from '../index';

sx.create({
  NoIssues: {
    color: 'red',
    zIndex: 10,
  },
  InvalidPropertyValue: {
    alignContent: 'unknown', // TODO: make this type-check (should throw)
  },
  InvalidPropertyType: {
    zIndex: '10', // TODO: make this type-check (should throw)
  },
});
