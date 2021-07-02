/**
 * @flow
 * @eslintExpectedError (19:5;19:17) Use logical CSS property "marginBlockEnd" instead of physical CSS property "marginBottom".
 * @eslintExpectedError (20:5;20:14) Use logical CSS property "marginBlockStart" instead of physical CSS property "marginTop".
 * @eslintExpectedError (21:5;21:16) Use logical CSS property "marginInlineEnd" instead of physical CSS property "marginRight".
 * @eslintExpectedError (22:5;22:15) Use logical CSS property "marginInlineStart" instead of physical CSS property "marginLeft".
 */

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('incorrectMargins')} />;
}

const styles = sx.create({
  // NOTE: visit also `valid/margin.js`
  incorrectMargins: {
    marginBlockEnd: 'solid',
    marginBlockStart: 'solid',
    marginInlineEnd: 'solid',
    marginInlineStart: 'solid',
  },
});
