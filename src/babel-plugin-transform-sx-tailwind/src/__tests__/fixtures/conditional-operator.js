// @flow strict

import type { Element } from 'react';

export default function Example(isVisible: boolean): Element<'div'> {
  return <div sxt={isVisible ? 'block visible' : 'hidden invisible'}>Lorem lipsum</div>;
}
