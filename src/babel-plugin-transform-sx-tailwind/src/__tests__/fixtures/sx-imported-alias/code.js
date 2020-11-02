// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';
import { create } from '@adeira/sx';

export default function Example(): Node {
  return (
    <>
      <div className={styles('text-red')}>Red text</div>
      <button
        className={tailwind('bg-blue-500 hover:bg-blue-700 text-white font-bold')}
        type="button"
      >
        Button
      </button>
    </>
  );
}

const styles = create({
  'text-red': {
    color: 'red',
  },
});
