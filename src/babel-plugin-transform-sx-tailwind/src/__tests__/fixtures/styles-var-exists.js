// @flow strict

import type { Element } from 'react';

export default function Example(): Element<'button'> {
  return (
    <button sxt="bg-blue-500 hover:bg-blue-700 text-white font-bold" type="button">
      Button
    </button>
  );
}

// eslint-disable-next-line no-unused-vars
const styles = 'Here I am';
