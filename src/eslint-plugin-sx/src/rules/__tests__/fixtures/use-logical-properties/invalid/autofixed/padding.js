/**
 * @flow
 * @eslintExpectedError (19:5;19:18) Use logical CSS property "paddingBlockEnd" instead of physical CSS property "paddingBottom".
 * @eslintExpectedError (20:5;20:15) Use logical CSS property "paddingBlockStart" instead of physical CSS property "paddingTop".
 * @eslintExpectedError (21:5;21:17) Use logical CSS property "paddingInlineEnd" instead of physical CSS property "paddingRight".
 * @eslintExpectedError (22:5;22:16) Use logical CSS property "paddingInlineStart" instead of physical CSS property "paddingLeft".
 */

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('incorrectPaddings')} />;
}

const styles = sx.create({
  // NOTE: visit also `valid/padding.js`
  incorrectPaddings: {
    paddingBlockEnd: 'solid',
    paddingBlockStart: 'solid',
    paddingInlineEnd: 'solid',
    paddingInlineStart: 'solid',
  },
});
