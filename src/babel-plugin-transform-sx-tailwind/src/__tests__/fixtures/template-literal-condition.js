// @flow

import React, { type Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Example(): Node {
  const darkMode = true;
  return (
    <div
      className={tailwind(
        `px-4 font-bold ${darkMode ? `text-white bg-black` : 'text-black bg-white'} rounded`,
      )}
    >
      Lorem lipsum
    </div>
  );
}
