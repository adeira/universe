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
  return <div className={styles('inline')}>{props.children}</div>;
}

const styles = sx.create({
  inline: {
    display: 'flex',
    flexDirection: 'row',
    gap: 'var(--sx-spacing-small)',
    flexWrap: 'wrap',
  },
});
