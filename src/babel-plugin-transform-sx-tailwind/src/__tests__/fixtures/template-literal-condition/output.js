// @flow
import React, { type Node } from 'react';
import * as sx from '@adeira/sx';
export default function Example(): Node {
  const darkMode = true;
  return (
    <div
      className={__styles_3kp10j(
        'px-4',
        'font-bold',
        ...(darkMode ? ['text-white', 'bg-black'] : ['text-black', 'bg-white']),
        'rounded',
      )}
    >
      Lorem lipsum
    </div>
  );
}

const __styles_3kp10j = sx.create({
  'text-white': {
    color: '#fff',
  },
  'bg-black': {
    backgroundColor: '#000',
  },
  'text-black': {
    color: '#000',
  },
  'bg-white': {
    backgroundColor: '#fff',
  },
  'px-4': {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  'font-bold': {
    fontWeight: 700,
  },
  'rounded': {
    borderRadius: '0.25rem',
  },
});
