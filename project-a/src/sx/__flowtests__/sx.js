// @flow

import React, { type Node } from 'react';

import sx from '../index';

export function NoErrors(): Node {
  const styles = sx.create({
    red: { color: 'red' },
  });
  return <div className={styles('red')} />;
}

export function NoErrorsWithPseudo(): Node {
  const styles = sx.create({
    red: {
      'color': 'red',
      ':hover': {
        color: 'blue',
      },
      '::after': {
        content: '★',
      },
    },
  });
  return <div className={styles('red')}>I am blue on hover</div>;
}

export function NoErrorsMoreStylesheetNames(): Node {
  const styles = sx.create({
    red: { color: 'red' },
    blue: { color: 'blue' },
  });
  return <div className={styles('red', 'blue')} />;
}

export function InvalidStylesheetName(): Node {
  // $FlowExpectedError[prop-missing]
  const styles = sx.create({
    red: { color: 'red' },
  });
  return <div className={styles('invalid')} />;
}

export function InvalidCSSProperty(): Node {
  // $FlowExpectedError[prop-missing]
  const styles = sx.create({
    // $FlowExpectedError[incompatible-call]
    red: { wtf: 'wtf' },
  });
  return <div className={styles('invalid')} />;
}

export function InvalidCSSPseudoProperty(): Node {
  // $FlowExpectedError[prop-missing]
  const styles = sx.create({
    // $FlowExpectedError[incompatible-call]
    red: {
      ':hover': -1,
    },
  });
  return <div className={styles('red')} />;
}
