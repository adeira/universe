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
    '@media (min-width: 30em) and (max-width: 50em)': {
      color: 'blue',
    },
    '@keyframes slidein': {
      from: { transform: 'translateX(0%)' },
      // $FlowIssue[unsupported-syntax]: https://github.com/facebook/flow/issues/380
      50: { marginTop: 'translateX(50%)' },
      to: { transform: 'translateX(100%)' },
    },
    '@media (min-width: 640px)': {
      '@media (min-width: 650px)': {
        '@media (min-width: 660px)': {
          maxWidth: '670px',
        },
      },
    },
  },
  NoIssuesAlternative: {
    zIndex: 'auto',
  },
  InvalidPropertyValue: {
    // $FlowExpectedError[incompatible-call]
    position: 'absolutely',
  },
  InvalidPropertyType: {
    // $FlowExpectedError[incompatible-call]: should be number or one of predefined strings
    zIndex: '10',
  },
  UnknownProperty: {
    // $FlowExpectedError[incompatible-call]
    unknownProperty: 'red',
  },
  UnknownPropertyInsideMedia: {
    // $FlowExpectedError[incompatible-call]
    '@media print': {
      unknownProperty: 'red',
    },
  },

  // TODO: we currently cannot type check these (falls into `@media` group, at-rules):
  InvalidKeyframesKey: {
    '@keyframes identifier': {
      color: 'red', // should be from/to/%
    },
  },
  UnsupportedAtRules: {
    // should throw since we do not support `@page`
    '@page': {
      color: 'red',
    },
  },
});
