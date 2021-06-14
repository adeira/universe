// @flow

import React, { type Node } from 'react';
import { isObject } from '@adeira/js';
import sx from '@adeira/sx';

type SlatePayload = $ReadOnlyArray<$FlowFixMe>;

type Props = {
  +nodes: SlatePayload,
};

// TODO: DRY with Abacus BO (SlateEditor)
export default function RenderSlateNodes({ nodes }: Props): Node {
  return nodes.map((node) => {
    if (isObject(node) && typeof node.text === 'string') {
      if (node.bold) {
        return <strong>{node.text}</strong>;
      } else if (node.code) {
        return <code>{node.text}</code>;
      } else if (node.italic) {
        return <em>{node.text}</em>;
      } else if (node.underline) {
        return <u>{node.text}</u>;
      }
      return node.text;
    }
    const children = <RenderSlateNodes nodes={node.children} />;
    if (node.type === 'block-quote') {
      return <blockquote className={styles('blockquote')}>{children}</blockquote>;
    } else if (node.type === 'paragraph') {
      return <p>{children}</p>;
    }
    // eslint-disable-next-line react/jsx-key
    return <span>{node}</span>;
  });
}

const styles = sx.create({
  blockquote: {
    paddingInlineStart: '1rem',
    marginInline: 0,
    borderInlineStart: '4px solid rgba(var(--sx-accent-2))',
  },
});
