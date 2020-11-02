// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';
import * as sx from '@adeira/sx';

export default function Example(): Node {
  const foo = <><div></div></>
  return (
    <div>
      <div className={styles('text-red')}>Red text</div>
      <button
        className={tailwind('bg-blue-500 hover:bg-blue-700 text-white font-bold')}
        type="button"
      >
        Button
      </button>
    </div>
  );
}

const styles = sx.create({
  'text-red': {
    color: 'red',
  },
});
