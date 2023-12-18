// @flow

import sx from '../index';

sx.create({
  NoIssues: {
    'color': 'red',
    'zIndex': 10,
    'pointerEvents': 'visible',
    ':hover': {
      color: 'blue',
    },
    '::after': {
      content: '"∞"',
    },
    '@media (min-width: 30em) and (max-width: 50em)': {
      color: 'blue',
    },
    '@keyframes slidein': {
      from: { transform: 'translateX(0%)' },
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
    // $FlowExpectedError[incompatible-call]: should be "absolute"
    position: 'absolutely',
  },
  InvalidPropertyType: {
    // $FlowExpectedError[incompatible-call]: should be number or one of predefined strings
    zIndex: '10',
  },
  // $FlowExpectedError[prop-missing] cannot be nested
  InvalidNestedPseudos: {
    '::before': {
      '::before': {
        content: '"∞"',
      },
    },
  },
  InvalidPropertyInsideMedia: {
    // $FlowExpectedError[incompatible-call]: color should be a string
    '@media print': {
      color: -1,
    },
  },

  // TODO: we currently cannot type check these (falls into `@media` group, at-rules, CSS variables):
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
  UnsupportedPseudoRule: {
    // ideally, should throw
    '::unknown-pseudo': {
      color: 'red',
    },
  },
  UnsupportedPseudoFormat: {
    // should be `:nth-child(4n)`
    ':nth-child': {
      color: 'red',
    },
  },
  NestedComplexPseudos: {
    ':nth-child(4n)': {
      // nested pseudos should not be allowed, but we cannot detect it
      ':nth-child(4n)': {
        color: 'lime',
      },
    },
  },
  UnknownProperty: {
    // unknown CSS property
    unknownProperty: 'red',
  },
  UnknownPropertyInsideMedia: {
    '@media print': {
      // unknown CSS property
      unknownProperty: 'red',
    },
  },
});
