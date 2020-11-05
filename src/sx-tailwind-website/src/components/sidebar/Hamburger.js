// @flow

import { useContext, type Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

import { SidebarContext } from './Context';

export default function Hamburger(): Node {
  const { open } = useContext(SidebarContext);
  return (
    <button
      className={tailwind(
        'px-6 h-20 text-gray-400 focus:outline-none focus:bg-gray-100 focus:text-gray-600 lg:hidden',
      )}
      aria-label="Open sidebar"
      type="button"
      onClick={open}
    >
      <svg
        className={tailwind('h-6 w-6 transition ease-in-out duration-150')}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h8m-8 6h16"
        />
      </svg>
    </button>
  );
}
