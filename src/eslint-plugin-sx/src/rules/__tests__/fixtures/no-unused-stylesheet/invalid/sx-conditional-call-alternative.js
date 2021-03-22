/**
 * @eslintExpectedError (26:3;26:31) Unused stylesheet: xxx (defined via "styles" variable)
 * @flow
 */

import type { Node } from 'react';
import { create as sxCreate } from '@adeira/sx';

export default function MyComponent(): Node {
  const isTrue = true;
  return (
    <div
      className={styles({
        aaa: true,
        ['bbb']: isTrue,
        [`ccc`]: isTrue,
      })}
    />
  );
}

const styles = sxCreate({
  aaa: { content: '_' },
  bbb: { content: 'used ✅' },
  ccc: { content: 'used ✅' },
  xxx: { content: 'UNUSED ❌' },
});
