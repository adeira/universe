// @flow

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('correctPaddings')} />;
}

const styles = sx.create({
  // NOTE: visit also `invalid/padding.js`
  correctPaddings: {
    paddingBlockEnd: 'solid',
    paddingBlockStart: 'solid',
    paddingInlineEnd: 'solid',
    paddingInlineStart: 'solid',
  },
});
