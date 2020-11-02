// @flow

import type { Node } from 'react';
import { PrismLight as PrismSyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import vscDarkPlus from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus';

PrismSyntaxHighlighter.registerLanguage('jsx', jsx);
PrismSyntaxHighlighter.registerLanguage('bash', bash);

type Props = {|
  +children: Node,
  +language: 'jsx' | 'bash',
|};

export default function SyntaxHighlighter({ children, language }: Props): Node {
  return (
    <PrismSyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{ background: '#252f3f', borderRadius: '0.5rem' }}
    >
      {children}
    </PrismSyntaxHighlighter>
  );
}
