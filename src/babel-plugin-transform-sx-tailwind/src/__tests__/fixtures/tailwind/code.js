// @flow

import React, { type Element } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Example(): Element<'button'> {
  return (
    <button
      className={tailwind('bg-blue-500 hover:bg-blue-700 text-white font-bold')}
      type="button"
    >
      Button
    </button>
  );
}
