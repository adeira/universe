// @flow

import * as React from 'react';

import { sxt } from '../../index';

export default {
  title: 'Buttons',
};

export const simple = (): React.Node => (
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

export const pill = (): React.Node => (
  <button
    className={sxt(
      'bg-blue-500',
      'hover:bg-blue-700',
      'text-white',
      'font-bold',
      'py-2',
      'px-4',
      'rounded-full',
    )}
    type="button"
  >
    Button
  </button>
);

export const outline = (): React.Node => (
  <button
    className={sxt(
      'bg-transparent',
      'hover:bg-blue-500',
      'text-blue-700',
      'font-semibold',
      'hover:text-white',
      'py-2',
      'px-4',
      'border',
      'border-blue-500',
      'hover:border-transparent',
      'rounded',
    )}
    type="button"
  >
    Button
  </button>
);

export const bordered = (): React.Node => (
  <button
    className={sxt(
      'bg-blue-500',
      'hover:bg-blue-700',
      'text-white',
      'font-bold',
      'py-2',
      'px-4',
      'border',
      'border-blue-700',
      'rounded',
    )}
    type="button"
  >
    Button
  </button>
);

export const disabled = (): React.Node => (
  <button
    className={sxt(
      'bg-blue-500',
      'text-white',
      'font-bold',
      'py-2',
      'px-4',
      'rounded',
      'opacity-50',
      'cursor-not-allowed',
    )}
    type="button"
  >
    Button
  </button>
);

export const plastic = (): React.Node => (
  <button
    className={sxt(
      'bg-blue-500',
      'hover:bg-blue-400',
      'text-white',
      'font-bold',
      'py-2',
      'px-4',
      'border-b-4',
      'border-blue-700',
      'hover:border-blue-500',
      'rounded',
    )}
    type="button"
  >
    Button
  </button>
);

export const elevated = (): React.Node => (
  <button
    className={sxt(
      'bg-white',
      'hover:bg-gray-100',
      'text-gray-800',
      'font-semibold',
      'py-2',
      'px-4',
      'border',
      'border-gray-400',
      'rounded',
      'shadow',
    )}
    type="button"
  >
    Button
  </button>
);

export const groups = (): React.Node => (
  <div className={sxt('inline-flex')}>
    <button
      className={sxt(
        'bg-gray-300',
        'hover:bg-gray-400',
        'text-gray-800',
        'font-bold',
        'py-2',
        'px-4',
        'rounded-l',
      )}
      type="button"
    >
      Prev
    </button>
    <button
      className={sxt(
        'bg-gray-300',
        'hover:bg-gray-400',
        'text-gray-800',
        'font-bold',
        'py-2',
        'px-4',
        'rounded-r',
      )}
      type="button"
    >
      Next
    </button>
  </div>
);

export const icons = (): React.Node => (
  <button
    className={sxt(
      'bg-gray-300',
      'hover:bg-gray-400',
      'text-gray-800',
      'font-bold',
      'py-2',
      'px-4',
      'rounded',
      'inline-flex',
      'items-center',
    )}
    type="button"
  >
    <svg
      className={sxt('fill-current', 'w-4', 'h-4', 'mr-2')}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
    </svg>
    <span>Download</span>
  </button>
);

// hack, "run it" so the sxt is executed and styles generated
simple();
pill();
outline();
bordered();
disabled();
plastic();
elevated();
groups();
icons();
