// @flow

import React, { type Node } from 'react';
import { sxt, tailwind } from '@adeira/sx-tailwind';

export default function Example(): Node {
  return (
    <>
      <button
        className={tailwind('bg-red-500 hover:bg-red-700 text-white font-bold')}
        type="button"
      >
        Tailwind Button
      </button>

      <button
        className={sxt(
          'bg-blue-500',
          'hover:bg-blue-700',
          'text-black',
          'rounded',
        )}
        type="button"
      >
        SXT Button
      </button>
    </>
  );
}
