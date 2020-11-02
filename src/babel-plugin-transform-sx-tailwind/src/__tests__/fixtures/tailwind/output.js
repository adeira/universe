// @flow
import type { Element } from 'react';
import * as sx from '@adeira/sx';
export default function Example(): Element<'button'> {
  return (
    <button
      className={__styles_1htO07('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold')}
      type="button"
    >
      Button
    </button>
  );
}

const __styles_1htO07 = sx.create({
  'bg-blue-500': {
    backgroundColor: '#4299e1',
  },
  'hover:bg-blue-700': {
    ':hover': {
      backgroundColor: '#2b6cb0',
    },
  },
  'text-white': {
    color: '#fff',
  },
  'font-bold': {
    fontWeight: 700,
  },
});
