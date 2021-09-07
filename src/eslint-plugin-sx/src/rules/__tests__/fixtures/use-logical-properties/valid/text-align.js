// @flow

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return (
    <div
      className={styles(
        'correctTextAlignStart',
        'correctTextAlignEnd',
        'correctTextAlignCenter',
        'correctTextAlignJustify',
      )}
    />
  );
}

const styles = sx.create({
  // NOTE: visit also `invalid/text-align.js`
  correctTextAlignStart: {
    textAlign: 'start',
  },
  correctTextAlignEnd: {
    textAlign: 'end',
  },
  correctTextAlignCenter: {
    textAlign: 'center',
  },
  correctTextAlignJustify: {
    textAlign: 'justify',
  },
});
