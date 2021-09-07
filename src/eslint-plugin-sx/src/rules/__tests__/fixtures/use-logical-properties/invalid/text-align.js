/**
 * @flow
 * @eslintExpectedError (17:16;17:22) Use logical CSS value "start" instead of physical CSS value "left".
 * @eslintExpectedError (20:16;20:23) Use logical CSS value "end" instead of physical CSS value "right".
 */

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('incorrectTextAlignLeft', 'incorrectTextAlignRight')} />;
}

const styles = sx.create({
  // NOTE: visit also `valid/text-align.js`
  incorrectTextAlignLeft: {
    textAlign: 'left',
  },
  incorrectTextAlignRight: {
    textAlign: 'right',
  },
});
