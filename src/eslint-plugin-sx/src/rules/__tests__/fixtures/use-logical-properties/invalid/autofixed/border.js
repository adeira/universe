/**
 * @flow
 * @eslintExpectedError (32:5;32:17) Use logical CSS property "borderBlockEnd" instead of physical CSS property "borderBottom".
 * @eslintExpectedError (33:5;33:22) Use logical CSS property "borderBlockEndColor" instead of physical CSS property "borderBottomColor".
 * @eslintExpectedError Use logical CSS property "borderBlockEndStyle" instead of physical CSS property "borderBottomStyle".
 * @eslintExpectedError Use logical CSS property "borderBlockEndWidth" instead of physical CSS property "borderBottomWidth".
 * @eslintExpectedError Use logical CSS property "borderBlockStart" instead of physical CSS property "borderTop".
 * @eslintExpectedError Use logical CSS property "borderBlockStartColor" instead of physical CSS property "borderTopColor".
 * @eslintExpectedError Use logical CSS property "borderBlockStartStyle" instead of physical CSS property "borderTopStyle".
 * @eslintExpectedError Use logical CSS property "borderBlockStartWidth" instead of physical CSS property "borderTopWidth".
 * @eslintExpectedError Use logical CSS property "borderInlineEnd" instead of physical CSS property "borderRight".
 * @eslintExpectedError Use logical CSS property "borderInlineEndColor" instead of physical CSS property "borderRightColor".
 * @eslintExpectedError Use logical CSS property "borderInlineEndStyle" instead of physical CSS property "borderRightStyle".
 * @eslintExpectedError Use logical CSS property "borderInlineEndWidth" instead of physical CSS property "borderRightWidth".
 * @eslintExpectedError Use logical CSS property "borderInlineStart" instead of physical CSS property "borderLeft".
 * @eslintExpectedError Use logical CSS property "borderInlineStartColor" instead of physical CSS property "borderLeftColor".
 * @eslintExpectedError Use logical CSS property "borderInlineStartStyle" instead of physical CSS property "borderLeftStyle".
 * @eslintExpectedError Use logical CSS property "borderInlineStartWidth" instead of physical CSS property "borderLeftWidth".
 */

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('incorrectBorders')} />;
}

const styles = sx.create({
  // NOTE: visit also `valid/border.js`
  incorrectBorders: {
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
