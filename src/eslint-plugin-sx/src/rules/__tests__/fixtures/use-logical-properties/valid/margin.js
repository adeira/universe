// @flow

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('correctMargins')} />;
}

const styles = sx.create({
  // NOTE: visit also `invalid/margin.js`
  correctMargins: {
    marginBlockEnd: 'solid',
    marginBlockStart: 'solid',
    marginInlineEnd: 'solid',
    marginInlineStart: 'solid',
  },
});
