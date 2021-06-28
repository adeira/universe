// @flow

import sx from '@adeira/sx';
import { LinkButton } from '@adeira/sx-design';
import React, { useCallback, useMemo, useState, type Node } from 'react';
import { createEditor, Editor } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import fbt from 'fbt';

type SlatePayload = $ReadOnlyArray<$FlowFixMe>;

type Props = {
  +value: SlatePayload,
  +onChange: (SlatePayload) => void,
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  if (isMarkActive(editor, format)) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const MarkButton = ({ format, children }) => {
  const editor = useSlate();
  return (
    <LinkButton
      isActive={isMarkActive(editor, format)}
      onClick={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      xstyle={styles.markButton}
    >
      {children}
    </LinkButton>
  );
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

  // See: https://github.com/ianstormtaylor/slate/blob/ea5e3e4ebf948264809b740f02e0fdf4bd5fead6/site/examples/richtext.tsx
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
        <div className={styles('slateEditorToolbar')}>
          <strong>
            <MarkButton format="bold">
              <fbt desc="button title to make the text bold">Bold</fbt>
            </MarkButton>
          </strong>
          <em>
            <MarkButton format="italic">
              <fbt desc="button title to make the text italic">Italic</fbt>
            </MarkButton>
          </em>
          <u>
            <MarkButton format="underline">
              <fbt desc="button title to make the text underline">Underline</fbt>
            </MarkButton>
          </u>
        </div>
        <Editable
          onClick={(event) => event.preventDefault()}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          style={{ margin: 12 }}
        />
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
  slateEditorToolbar: {
    borderBlockEnd: '2px solid rgba(var(--sx-accent-2))',
  },
  blockquote: {
    paddingInlineStart: '1rem',
    marginInline: 0,
    borderInlineStart: '4px solid rgba(var(--sx-accent-2))',
  },
  markButton: {
    marginTop: '.3rem',
    marginBottom: '.3rem',
    marginLeft: '.5rem',
  },
});
