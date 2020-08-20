// @flow

import React, { type Node } from 'react';

import create from '../create';

export function NoErrors(): Node {
  const styles = create({
    red: { color: 'red' },
  });
  return <div className={styles('red')} />;
}

export function NoErrorsMoreStylesheetNames(): Node {
  const styles = create({
    red: { color: 'red' },
    blue: { color: 'blue' },
  });
  return <div className={styles('red', 'blue')} />;
}

export function InvalidStylesheetName(): Node {
  // $FlowExpectedError[prop-missing]
  const styles = create({
    red: { color: 'red' },
  });
  return <div className={styles('invalid')} />;
}

export function InvalidCSSProperty(): Node {
  // $FlowExpectedError[prop-missing]
  const styles = create({
    red: { wtf: 'wtf' },
  });
  return <div className={styles('invalid')} />;
}
