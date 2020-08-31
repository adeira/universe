// @flow
import React, { type Node } from 'react';
import * as sx from '@adeira/sx';
export default function Example(): Node {
  return (
    <>
      <button
        className={__styles_2emqkS('bg-red-500', 'hover:bg-red-700', 'text-white', 'font-bold')}
        type="button"
      >
        Tailwind Button
      </button>

      <button
        className={__styles_2emqkS('bg-blue-500', 'hover:bg-blue-700', 'text-black', 'rounded')}
        type="button"
      >
        SXT Button
      </button>
    </>
  );
}

const __styles_2emqkS = sx.create({
  'bg-red-500': {
    backgroundColor: '#f56565',
  },
  'hover:bg-red-700': {
    ':hover': {
      backgroundColor: '#c53030',
    },
  },
  'text-white': {
    color: '#fff',
  },
  'font-bold': {
    fontWeight: 700,
  },
  'bg-blue-500': {
    backgroundColor: '#4299e1',
  },
  'hover:bg-blue-700': {
    ':hover': {
      backgroundColor: '#2b6cb0',
    },
  },
  'text-black': {
    color: '#000',
  },
  'rounded': {
    borderRadius: '0.25rem',
  },
});
