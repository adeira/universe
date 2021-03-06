// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +children: Node,
};

/**
 * Responsibility of a `LayoutInline` component is to render given children with appropriate spacing
 * in horizontal line.
 */
export default function LayoutInline(props: Props): Node {
  return React.Children.map(props.children, function (child) {
    return <div className={styles('child')}>{child}</div>;
  });
}

const styles = sx.create({
  child: {
    'display': 'inline-block',
    'paddingInlineEnd': 'var(--sx-spacing-default)',
    'paddingBlockEnd': 'var(--sx-spacing-default)',
    ':last-child': {
      paddingInlineStart: 0,
    },
  },
});
