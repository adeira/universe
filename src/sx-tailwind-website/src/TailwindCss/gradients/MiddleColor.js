// @flow strict

import type { Node } from 'react';

export default function MiddleColor(): Node {
  return <div sxt="h-24 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" />;
}

export const code = `<div sxt="h-24 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" />`;
