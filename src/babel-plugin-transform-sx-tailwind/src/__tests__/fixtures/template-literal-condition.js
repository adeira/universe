// @flow strict

import React, { type Node } from 'react';

export default function Example(): Node {
  const darkMode = true;
  return (
    <div sxt={`px-4 font-bold ${darkMode ? `text-white bg-black` : 'text-black bg-white'} rounded`}>
      Lorem lipsum
    </div>
  );
}
