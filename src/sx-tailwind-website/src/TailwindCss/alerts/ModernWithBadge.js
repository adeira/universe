// @flow strict

import type { Node } from 'react';

export default function ModernWithBadge(): Node {
  return (
    <div sxt="bg-indigo-900 text-center py-4 lg:px-4">
      <div
        sxt="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
        role="alert"
      >
        <span sxt="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
          New
        </span>
        <span sxt="font-semibold mr-2 text-left flex-auto">
          Get the coolest t-shirts from our brand new store
        </span>
        <svg
          sxt="fill-current opacity-75 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
        </svg>
      </div>
    </div>
  );
}
