// @flow

import type { Node } from 'react';

export default function Bounce(): Node {
  return (
    <svg
      sxt="animate-bounce w-6 h-6 text-gray-900 mx-auto"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  );
}

export const code = `<svg sxt="animate-bounce w-6 h-6 text-gray-900 mx-auto" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
  <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
</svg>
`;
