// @flow

import type { Element } from 'react';
import { sxt } from '@adeira/sx-tailwind';

export default function Example(): Element<'button'> {
  return (
    <button
      className={sxt(
        'bg-blue-500',
        'hover:bg-blue-700',
        'text-white',
        'font-bold',
        'py-2',
        'px-4',
        'rounded',
      )}
      type="button"
    >
      Button
    </button>
  );
}
