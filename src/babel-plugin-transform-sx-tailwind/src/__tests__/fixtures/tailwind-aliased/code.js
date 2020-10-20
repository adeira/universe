// @flow

import React, { type Element } from 'react';
import { tailwind as myTailwind } from '@adeira/sx-tailwind';

export default function Example(): Element<'button'> {
  return (
    <button
      className={myTailwind('bg-blue-500 hover:bg-blue-700 text-white font-bold')}
      type="button"
    >
      Button
    </button>
  );
}
