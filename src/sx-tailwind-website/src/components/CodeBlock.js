// @flow

import type { Node } from 'react';
import refractor from 'refractor/core';
import toHtml from 'hast-util-to-html';
import jsx from 'refractor/lang/jsx';
import bash from 'refractor/lang/bash';

refractor.register(jsx);
refractor.register(bash);

type Props = {
  +children: Node,
  +language?: 'jsx' | 'bash',
  +attached?: boolean,
};

export default function SyntaxHighlighter({
  children,
  language = 'jsx',
  attached = false,
}: Props): Node {
  const highlightedText = toHtml(refractor.highlight(children, language));

  return (
    <pre
      data-language={language}
      sxt={`text-sm bg-gray-800 whitespace-pre p-4 ${attached ? 'rounded-b-lg' : 'rounded-lg'}`}
      dangerouslySetInnerHTML={{
        __html: highlightedText,
      }}
    />
  );
}
