// @flow strict

import { useContext, type Node } from 'react';

import { SidebarContext } from './Context';

type Props = {
  +children: Node,
};

export default function Overlay({ children }: Props): Node {
  return (
    <div sxt="lg:hidden fixed inset-0 flex z-40">
      <div sxt="fixed inset-0">
        <div sxt="transition-opacity ease-linear duration-300 absolute inset-0 bg-gray-600 opacity-75" />
      </div>
      <div sxt="relative flex-1 flex flex-col max-w-xs w-full bg-teal-600">
        <div sxt="absolute top-0 right-0 -mr-16 p-1">
          <CloseButton />
        </div>
        {children}
      </div>
    </div>
  );
}

function CloseButton(): Node {
  const { close } = useContext(SidebarContext);
  return (
    <button
      sxt="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
      aria-label="Close sidebar"
      type="button"
      onClick={close}
    >
      <svg sxt="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
