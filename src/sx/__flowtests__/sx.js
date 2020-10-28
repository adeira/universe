// @flow

import React, { type Node } from 'react';

import * as sx from '../index';

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
        content: '"★"',
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
  const styles = sx.create({
    red: { color: 'red' },
  });
  // $FlowExpectedError[incompatible-call]
  return <div className={styles('invalid')} />;
}

export function InvalidCSSProperty(): Node {
  const styles = sx.create({
    red: {
      // $FlowExpectedError[incompatible-call]
      wtf: 'wtf',
    },
  });
  // $FlowExpectedError[incompatible-call]
  return <div className={styles('invalid')} />;
}

export function InvalidCSSPseudoProperty(): Node {
  const styles = sx.create({
    red: {
      // $FlowExpectedError[incompatible-call]
      ':hover': -1,
    },
  });
  return <div className={styles('red')} />;
}

export function FlexNonNumericValues(): Node {
  const styles = sx.create({
    'flex-1': { flex: '1 1 0%' },
    'flex-auto': { flex: '1 1 auto' },
    'flex-initial': { flex: '0 1 auto' },
    'flex-none': { flex: 'none' },
  });
  return <div className={styles('flex-1', 'flex-auto', 'flex-initial', 'flex-none')} />;
}

export function GridColumnNonNumericValues(): Node {
  const styles = sx.create({
    'col-auto': { gridColumn: 'auto' },
    'col-end-auto': { gridColumnEnd: 'auto' },
    'col-span-1': { gridColumn: 'span 1 / span 1' },
  });
  return <div className={styles('col-auto', 'col-end-auto', 'col-span-1')} />;
}

export function GridRowNonNumericValues(): Node {
  const styles = sx.create({
    'row-auto': { gridRow: 'auto' },
    'row-end-auto': { gridRowEnd: 'auto' },
    'row-span-1': { gridRow: 'span 1 / span 1' },
    'row-start-auto': { gridRowStart: 'auto' },
  });
  return <div className={styles('row-auto', 'row-end-auto', 'row-span-1', 'row-start-auto')} />;
}

export function ZIndex(): Node {
  const styles = sx.create({
    'z-auto': { zIndex: 'auto' },
    'z-10': { zIndex: 10 },
  });
  return <div className={styles('z-auto', 'z-10')} />;
}
