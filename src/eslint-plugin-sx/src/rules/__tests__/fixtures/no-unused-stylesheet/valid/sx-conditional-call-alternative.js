// @flow

import type { Node } from 'react';
import { create as sxCreate } from '@adeira/sx';

export default function MyComponent(): Node {
  const isTrue = true;
  return (
    <div
      className={styles({
        aaa: true,
        ['bbb']: isTrue,
        ccc: false,
      })}
    />
  );
}

const styles = sxCreate({
  aaa: { content: 'aaa' },
  bbb: { content: 'bbb' },
  ccc: { content: 'ccc' },
});
