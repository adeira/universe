// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

type Props = {
  +children: Node,
  +minColumnWidth?: string,
};

/**
 * Responsibility of a `LayoutGrid` component is to render given children with appropriate spacing
 * in a CSS grid.
 */
export default function LayoutGrid(props: Props): Node {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${props.minColumnWidth ?? '200px'}, 1fr))`,
      }}
      className={styles('grid')}
    >
      {props.children}
    </div>
  );
}

const styles = sx.create({
  grid: {
    display: 'grid',
    gap: 'var(--sx-spacing-default)',
  },
});
