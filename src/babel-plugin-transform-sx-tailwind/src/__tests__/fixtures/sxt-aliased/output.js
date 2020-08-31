// @flow
import React, { type Element } from 'react';
import * as sx from '@adeira/sx';
export default function Example(): Element<'button'> {
  return (
    <button
      className={__styles_4jHLDM(
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

const __styles_4jHLDM = sx.create({
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
  'py-2': {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  'px-4': {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  'rounded': {
    borderRadius: '0.25rem',
  },
});
