// @flow

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('correctBorders')} />;
}

const styles = sx.create({
  // NOTE: visit also `invalid/border.js`
  correctBorders: {
    // Border bottom:
    borderBlockEnd: 'solid',
    borderBlockEndColor: 'red',
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: 'thick',

    // Border top:
    borderBlockStart: 'solid',
    borderBlockStartColor: 'red',
    borderBlockStartStyle: 'solid',
    borderBlockStartWidth: 'thick',

    // Border right:
    borderInlineEnd: 'solid',
    borderInlineEndColor: 'red',
    borderInlineEndStyle: 'solid',
    borderInlineEndWidth: 'thick',

    // Border left:
    borderInlineStart: 'solid',
    borderInlineStartColor: 'red',
    borderInlineStartStyle: 'solid',
    borderInlineStartWidth: 'thick',
  },
});
