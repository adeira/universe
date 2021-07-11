// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +children: Node,
};

/**
 * Responsibility of a `LayoutBlock` component is to render given children with appropriate spacing
 * in a vertical line.
 */
export default function LayoutBlock(props: Props): Node {
  return React.Children.map(props.children, function (child) {
    return <div className={styles('child')}>{child}</div>;
  });
}

const styles = sx.create({
  child: {
    'display': 'flex',
    'flexDirection': 'column',
    'paddingBlockEnd': 'var(--sx-spacing-default)',
    ':last-child': {
      paddingBlockEnd: 0,
    },
  },
});
