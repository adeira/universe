// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +children: Node,
};

export default function CustomErrorMessage({ children }: Props): Node {
  return <div className={styles('error')}>{children}</div>;
}

const styles = sx.create({
  error: {
    color: 'red',
  },
});
