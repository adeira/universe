// @flow

import type { Node } from 'react';

import CodeBlock from './CodeBlock';

type Props = {
  +children: Node,
  +code: string,
};

export default function Showcase({ children, code }: Props): Node {
  return (
    <div sxt="relative overflow-hidden mb-8">
      <div sxt="rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 text-center p-4 py-12">
        {children}
      </div>
      <CodeBlock attached={true}>{code}</CodeBlock>
    </div>
  );
}
