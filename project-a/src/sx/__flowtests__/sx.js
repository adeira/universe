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
    red: { color: 'red' },
    blue: sx.pseudo({
      hover: { color: 'blue' },
    }),
  });
  return <div className={styles('red', 'blue')} />;
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
