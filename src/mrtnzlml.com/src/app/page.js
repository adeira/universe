// @flow

import React, { type Node } from 'react';
import * as sx from '@stylexjs/stylex';

export default function Homepage(): Node {
  return <strong {...sx.props(styles.todo)}>TODO: mrtnzlml.com</strong>;
}

const styles = sx.create({
  todo: {
    color: 'green',
    fontSize: 20,
  },
});
