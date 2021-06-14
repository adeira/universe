// @flow

import sx from '@adeira/sx';
import React, { useCallback, useMemo, useState, type Node } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

type SlatePayload = $ReadOnlyArray<$FlowFixMe>;

type Props = {
  +value: SlatePayload,
  +onChange: (SlatePayload) => void,
};

// TODO: DRY with Abacus KO (RenderSlateNodes)
export default function SlateEditor(props: Props): Node {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(props.value);

  const renderElement = useCallback(({ attributes, children, element }) => {
    switch (element.type) {
      case 'block-quote':
        return (
          <blockquote className={styles('blockquote')} {...attributes}>
            {children}
          </blockquote>
        );
      case 'paragraph':
        return <p {...attributes}>{children}</p>;
      default:
        return <span {...attributes}>{children}</span>;
    }
  }, []);

  const renderLeaf = useCallback(({ attributes, children, leaf }) => {
    let newChildren = children;
    if (leaf.bold) {
      newChildren = <strong>{children}</strong>;
    } else if (leaf.code) {
      newChildren = <code>{children}</code>;
    } else if (leaf.italic) {
      newChildren = <em>{children}</em>;
    } else if (leaf.underline) {
      newChildren = <u>{children}</u>;
    }
    return <span {...attributes}>{newChildren}</span>;
  }, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => {
        props.onChange(newValue);
        setValue(newValue);
      }}
    >
      <div className={styles('slateEditor')}>
        <Editable renderElement={renderElement} renderLeaf={renderLeaf} style={{ margin: 12 }} />
      </div>
    </Slate>
  );
}

const styles = sx.create({
  slateEditor: {
    width: '100%',
    border: '2px solid rgba(var(--sx-accent-2))',
    borderRadius: 5,
  },
  blockquote: {
    paddingInlineStart: '1rem',
    marginInline: 0,
    borderInlineStart: '4px solid rgba(var(--sx-accent-2))',
  },
});
