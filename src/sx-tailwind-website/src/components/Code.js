// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

type Props = {|
  +children: Node,
|};

export default function Code({ children }: Props): Node {
  return (
    <code
      className={tailwind(
        'font-mono text-purple-600 text-sm bg-gray-300 whitespace-pre px-2 py-1 rounded',
      )}
    >
      {children}
    </code>
  );
}
