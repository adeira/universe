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
  return <div className={styles('block')}>{props.children}</div>;
}

const styles = sx.create({
  block: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--sx-spacing-small)',
  },
});
