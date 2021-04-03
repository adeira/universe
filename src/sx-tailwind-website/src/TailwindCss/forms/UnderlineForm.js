// @flow strict

import type { Node } from 'react';

export default function UnderlineForm(): Node {
  return (
    <form sxt="w-full max-w-sm">
      <div sxt="flex items-center border-b border-teal-500 py-2">
        <input
          sxt="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Jane Doe"
          aria-label="Full name"
        />
        <button
          sxt="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
        >
          Sign Up
        </button>
        <button
          sxt="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
