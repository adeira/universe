// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +children: Node,
};

// TODO: should eventually be extracted into CSS var and reused in other layout components
const DEFAULT_SPACING = 10;

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
    'paddingInlineEnd': DEFAULT_SPACING,
    'paddingBlockEnd': DEFAULT_SPACING,
    ':last-child': {
      paddingInlineStart: 0,
    },
  },
});
