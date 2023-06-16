// @flow strict

import type { Node } from 'react';

export default function TestComponent(): Node {
  // eslint-disable-next-line react/jsx-curly-brace-presence
  return <div>{<div>TEST</div>}</div>;
}
