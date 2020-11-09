// @flow

import type { Node } from 'react';
import { create } from '@adeira/sx';

export default function Example(): Node {
  return <div className={styles('text-red')}>Red text</div>;
}

const styles = create({
  // Keep the quoted property here!
  'text-red': {
    color: 'red',
  },
});
