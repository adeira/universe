// @flow
import type { Element } from 'react';
import * as sx from '@adeira/sx';
export default function Example(): Element<'button'> {
  return (
    <button
      className={__styles_zlbba('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold')}
      type="button"
    >
      Button
    </button>
  );
} // eslint-disable-next-line no-unused-vars

const styles = 'Here I am';

const __styles_zlbba = sx.create({
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
