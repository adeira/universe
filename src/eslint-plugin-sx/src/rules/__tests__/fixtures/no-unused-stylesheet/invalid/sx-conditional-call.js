/**
 * @eslintExpectedError (25:3;25:29) Unused stylesheet: xxx (defined via "styles" variable)
 * @flow
 */

import type { Node } from 'react';
import { create as sxCreate } from '@adeira/sx';

export default function MyComponent(): Node {
  const isTrue = true;
  return (
    <>
      <div className={styles('aaa', isTrue && 'bbb')} />
      <div className={styles('aaa', isTrue ? 'ccc' : null)} />
      <div className={styles('aaa', isTrue ? null : 'ddd')} />
    </>
  );
}

const styles = sxCreate({
  aaa: { content: '_' },
  bbb: { content: 'LogicalExpression' },
  ccc: { content: 'ConditionalExpression (consequent)' },
  ddd: { content: 'ConditionalExpression (alternate)' },
  xxx: { content: 'UNUSED' },
});
