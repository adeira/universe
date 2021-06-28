// @flow

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('correctBorders')} />;
}

const styles = sx.create({
  correctBorders: {
    // NOTE: visit also `invalid/border.js`
    borderBlockEnd: 'solid',
    borderBlockEndColor: 'red',
    borderBlockEndStyle: 'solid',
    borderBlockEndWidth: 'thick',
  },
});
