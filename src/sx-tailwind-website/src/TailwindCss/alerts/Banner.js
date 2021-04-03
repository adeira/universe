// @flow strict

import type { Node } from 'react';

export default function Banner(): Node {
  return (
    <div sxt="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
      <p sxt="font-bold">Informational message</p>
      <p sxt="text-sm">Some additional text to explain said message.</p>
    </div>
  );
}
