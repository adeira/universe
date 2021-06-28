/**
 * @flow
 * @eslintExpectedError (19:5;19:17) Use logical CSS property "borderBlockEnd" instead of physical CSS property "borderBottom".
 * @eslintExpectedError (20:5;20:22) Use logical CSS property "borderBlockEndColor" instead of physical CSS property "borderBottomColor".
 * @eslintExpectedError Use logical CSS property "borderBlockEndStyle" instead of physical CSS property "borderBottomStyle".
 * @eslintExpectedError Use logical CSS property "borderBlockEndWidth" instead of physical CSS property "borderBottomWidth".
 */

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('incorrectBorders')} />;
}

const styles = sx.create({
  incorrectBorders: {
    // NOTE: visit also `valid/border.js`
    borderBottom: 'solid',
    borderBottomColor: 'red',
    borderBottomStyle: 'solid',
    borderBottomWidth: 'thick',
  },
});
